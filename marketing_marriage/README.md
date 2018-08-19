# Markeing Marriage

I wanna do some data mining in Chinese marriage market. Collecting data is first step, requiring me to learn how to use Scrapy.

Now I'm trying to scrape [世纪佳缘](http://www.jiayuan.com/).

``` flow
st=>start: Start
e=>end: End
op1=>operation: Scrape data
op2=>operation: Data Analysis
sub1=>subroutine: Persist data
cond=>condition: Requiring more data?
io1=>inputoutput: Save data
st->op1->io1->cond
cond(yes)->op2->e
cond(no)->sub1(right)->op1
```