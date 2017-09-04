# coding=utf-8

# urllib模块提供了读取Web页面数据的接口
import urllib3
# re模块主要包含了正则表达式
import re

http_pool = urllib3.HTTPConnectionPool('weibo.com')

# 定义一个getHtml()函数
def getHtml(url):
    page = http_pool.urlopen('get', url)  # urllib.urlopen()方法用于打开一个URL地址
    html = page.read()  # read()方法用于读取URL上的数据
    return html


def getImg(html):
    reg = r'src="(.+?\.jpg)" pic_ext'  # 正则表达式，得到图片地址
    imgre = re.compile(reg)  # re.compile() 可以把正则表达式编译成一个正则表达式对象.
    imglist = re.findall(imgre, html)  # re.findall() 方法读取html 中包含 imgre（正则表达式）的    数据
    # 把筛选的图片地址通过for循环遍历并保存到本地
    # 核心是urllib.urlretrieve()方法,直接将远程数据下载到本地，图片通过x依次递增命名
    x = 0

    for imgurl in imglist:

        # http_pool(imgurl, '/home/CFWLoader/Pictures/crawled/%s.jpg' % x)

        file = http_pool.urlopen('get', imgurl).read()

        open('/home/CFWLoader/Pictures/crawled/%s.jpg' % x, 'wb').write(file)

        x += 1


 #html = getHtml("http://weibo.com/p/1005051858002662/photos?from=page_100505&mod=TAB#place")

# print(html)

# print(getImg(html))

import requests

req = requests.get('https://wx2.sinaimg.cn/thumb300/6ebedee6ly1fiwb9v5zbhj20q20vn0vr.jpg')