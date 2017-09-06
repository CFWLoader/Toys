import urllib
import urllib.error
from urllib import request
from Launcher import Launcher

class PicCrawler(Launcher):

    def __init__(self, username, passwd):

        super().__init__(username, passwd)

    def send_request(self, url):

        data = self.get_prelogin_args()

        post_data = self.build_post_data(data)

        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
        }

        try:

            request = urllib.request.Request(url=url, data=post_data, headers=headers)

            response = urllib.request.urlopen(request)

            return response

        except urllib.error as e:

            print(e.code)


if __name__ == '__main__':

    user_file = open('./user.info', 'r')

    username = user_file.readline().strip('\n')

    passwd = user_file.readline()

    pic_crawler = PicCrawler(username, passwd)

    pic_crawler.login()

    resp = pic_crawler.send_request('https://ww3.sinaimg.cn/thumb300/51c2f66dgw1fakdne7ljlj20go09dadt.jpg')

    page = resp.read()

    file = open('./test.jpg', 'wb')

    file.write(page)

    # print(page)