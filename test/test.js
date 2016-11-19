/**
 * Created by Administrator on 14-4-4.
 */
var crawler = require('../lib/crawler');

crawler.addStrategy('*',function(err, $, body, url, resp){
	  //console.log(body);
    console.log($("img").attr('src'));
});
crawler.request("http://c6.d5j.biz/htm_data/16/1611/2135730.html",{decode:"utf-8",deep:3,concurrency:3}, function(err, $, body,resp){
  $.spider();
});
