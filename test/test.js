/**
 * Created by Administrator on 14-4-4.
 */
var crawler = require('../lib/crawler');

crawler.addStrategy(/.elong./,function(err, $, body, url, resp){
	  //console.log(body);
    console.log($("title").text(),url);
});
crawler.request("http://flight.elong.com/",{decode:null,deep:3,concurrency:5}, function(err, $, body,resp){
  $.spider();
});