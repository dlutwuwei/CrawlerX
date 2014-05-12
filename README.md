# CrawlerX
[![NPM](https://nodei.co/npm/crawlerx.png)](https://nodei.co/npm/crawlerx/)

## Introduce

A powerful crawler support strategy to different url, the crawler can traverse all web page in a site **recursively** with certain **deep**. of course, you alse can do not use recursive crawl in the callback.

You can put **different strategy** to process the web page of certain url pattern, here we use [routes](https://www.npmjs.org/package/routes) to match the url,routes support regular expression, see [routes](https://www.npmjs.org/package/routes).

In order to avoid event loop queue overflow, you can set the **concurrency** number to send certain requests in a time.

It can also support more text code by using iconv-lite, you can set **decode** for website with different text code,or set **decode** to null let crawler analyze it automatically.

We use [request](https://github.com/mikeal/request) to browse website, you can get more config parameter for http request, see [request](https://github.com/mikeal/request).
## installation

npm install crawlerx

## Quick Examples
```js
/**
 * Created by wuwei on 14-4-4.
 */
var crawler = require('crawlerx');

crawler.addStrategy(/.cnodjs.org./,function(err, $, body, url, resp){
	  //console.log(body);
    console.log($("title").text(),url);
});

crawler.addStrategy(/.github.com./,function(err, $, body, url, resp){
	  //console.log(body);
    console.log($("title").text(),url);
});


crawler.request("http://cnodejs.org",{decode:"utf-8",deep:3,concurrency:3}, function(err, $, body,url,resp){
  $.spider();  //start recursive crawl
});
```
## License

( The MIT License )

Copyright (c) 2014 wuwei contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
