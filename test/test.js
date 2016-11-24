/**
 * Created by Administrator on 14-4-4.
 */
var crawler = require('../lib/crawler');

crawler.addStrategy('*',function(err, $, body, url, resp){
	  //console.log(body);
    console.log($("img").attr('src'));
});
crawler.request("http://baidu.com/",{decode:"utf-8",deep:3,concurrency:3}, function(err, $, body,resp){
  $.spider();
});
