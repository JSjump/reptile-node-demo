const express = require('express');
const superagent = require('superagent'); // 第三方客户端请求代理模块
const cheerio = require('cheerio'); // 相当于node中的jquery

const app = express();

let hotNews = [];
let localNews = [];


let getHotNews = (res) => {
    let hotNews = [];
    // 访问成功，请求http://new.baidu.com/ 页面所返回的数据会包含在res.text中。

 /* 使用cheerio模块的cheerio.load()方法，将HTMLdocument作为参数传入函数
    以后就可以使用类似jquery的$(selector)的方式获取页面元素
 */
    let $ = cheerio.load(res.text);

    // 找到目标数据所在的页面元素，获取数据
    $('div#pane-news ul li a').each((index,ele) => {
          // cheerio中$('selector).each()用来遍历所有匹配到的dom元素
          let news =  {
              title: $(ele).text(),          //获取新闻标题
              href:$(ele).attr('href')       //获取新文网页链接   
          };
          hotNews.push(news);
    });
    return hotNews;
}




superagent.get('http://news.baidu.com/').end((err,res) =>{
    if(err) {
        console.log(err)
    }else{
        hotNews = getHotNews(res);
    }
})

app.get('/',async (req,res) => {
    res.send(hotNews);
})


app.listen(3000);
console.log('your app is running at localhost:3000');
