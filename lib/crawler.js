/**
 * Created by wuwei on 14-4-4.
 */
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var request = require('request');
var utils = require('./utils.js');
var router = require('routes')();
var async = require('async')

//urls collection to avoid duplicate url
var urls ={};

//queue to control the number of concurrency request
var q = null;

//method to start crawel
exports.request = function (url, options, strategy){

	if(options instanceof Function){
		strategy = options
		options = {};
	}

	var options = utils.extend(options,{
	  uri: url,
	  headers:{
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36'
	  },
	  encoding: null
	});

	if(!q) {
		if(!options.concurrency) {
			options.concurrency = 1;
		}
		q = async.queue(function(task,callback) {
			//console.log(task.deep, q.length(),task.options.uri)
			task.options.uri = task.url;
			task.options.encoding = task.encoding;
			request(task.options,callback);
		}, options.concurrency);
	}
	
	var deep = options.deep;
	
	//get the callback with crawel deep
	var getCallback = function(deep){
		//closure deep into callback
		return function(err, resp, body) {

			if(deep<0) return;
			deep--;
			if(err)return;

			var str = JSON.stringify(resp.headers).match(/charset=.*?"/gi);
			//get the host to process file path url.
			var host = options.uri.match(/^https?:\/\/.*?\//g);
			if(!host) host = options.uri+"/";

			//get text code from resp headers
			if(str!=null&&options.decode==null)
				options.decode= str[0].substr(0,str[0].length-1).split('=')[1];

			if(body instanceof Buffer&&options.decode!=null)
				body = iconv.decode(body,options.decode);
			body += '';
			var $ = cheerio.load(body);

			//spider function to crawel urls from website
			$.spider =  function(){

				$('a').each(function(index, value){
					var url = $(this).attr('href');
					if(url) url = url.replace("./","/");
					if(!url||url.indexOf("javascript")>=0||url.indexOf("void")>=0||url=="/"||url.indexOf("#")>=0)
					{
						return;
					}

					// if file path then add the host to get url
					if (!/^https?:/.test(url)){
						url= host+(url[0]=='/'?url.substr(1,url.length):url);
					}

					var route = router.match(url);
					if(route!=null){
						route.fn.apply(null,[err,$,body,url,resp]);
						options.uri = url;
						if(urls[url]){
							//reapet url
							return;
						}
						else {
							urls[url]=1;
						}
						//console.log(url,deep, q.length(),options.uri,body);
						q.push({deep:deep,url:url,options:options,encoding:options.encoding}, getCallback(deep));
					}
				});
			};

			strategy(err, $, body,url, resp);
		}
	}
	
	q.push({
		deep: deep,
		url: url,
		options:options
	}, getCallback(deep));

}

//add different strategy to different urls
exports.addStrategy = function(pattern, strategy){
  if(!strategy && pattern instanceof Object)
    router.addRoute(pattern.pattern, pattern.strategy);
  else
    router.addRoute(pattern, strategy);
}

//ignore some url
exports.ignore = function(pattern){
    router.addRoute(pattern ,function(){
        return false;
    });
}



