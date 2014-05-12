/**
 * Created by Administrator on 14-4-4.
 */
var crawler = require('../lib/crawler');

crawler.addStrategy('*',function(err, $, body, url, resp){
	  //console.log(body);
    console.log($("title").text(),url);
});
crawler.request("http://www.elong.com",{decode:"utf-8",deep:3,concurrency:3}, function(err, $, body,resp){
  $.spider();
});
