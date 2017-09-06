import urllib.error
import urllib.request
import urllib.parse
import re
import rsa
import http.cookiejar
import base64
import json
import urllib
import binascii


class Launcher:
    def __init__(self, username, password):

        self.username = username

        self.password = password

    # def get_encrypted_pw(self, password, nonce, servertime, pub_key):
    #
    #     rsa_e = 65537
    #
    #     pw_string = str(servertime) + '\t' + str(nonce) + '\n' + str(password)
    #
    #     key = rsa.PublicKey(int(pub_key, 16), rsa_e)
    #
    #     pw_encrypted = rsa.encrypt(pw_string, key)
    #
    #     passwd = binascii.b2a_hex(pw_encrypted)
    #
    #     return passwd

    def get_encrypted_pw(self, data):

        rsa_e = 65537

        pw_string = str(data['servertime']) + '\t' + str(data['nonce']) + '\n' + str(self.password)

        key = rsa.PublicKey(int(data['pubkey'], 16), rsa_e)

        pw_encrypted = rsa.encrypt(pw_string.encode('utf-8'), key)

        self.password = ''

        passwd = binascii.b2a_hex(pw_encrypted)

        # print(passwd)

        return passwd

    def get_encrypted_name(self):

        username_urllike = urllib.request.quote(self.username)

        username_encrypted = base64.b64encode(bytes(username_urllike, encoding='utf-8'))

        return username_encrypted.decode('utf-8')

    def get_prelogin_args(self):

        json_pattern = re.compile('\((.*)\)')

        url = 'http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=&' + self.get_encrypted_name() + '&rsakt=mod&checkpin=1&client=ssologin.js(v1.4.19)'

        try:

            request = urllib.request.Request(url)

            response = urllib.request.urlopen(request)

            raw_data = response.read().decode('utf-8')

            json_data = json_pattern.search(raw_data).group(1)

            data = json.loads(json_data)

            return data

        except urllib.error as e:

            print("%d" % e.code)

            return None

    def enable_cookies(self):

        cookie_container = http.cookiejar.CookieJar()

        cookie_support = urllib.request.HTTPCookieProcessor(cookie_container)

        opener = urllib.request.build_opener(cookie_support, urllib.request.HTTPHandler)

        urllib.request.install_opener(opener)

    def build_post_data(self, raw):

        post_data = {
            "entry": "weibo",
            "gateway": "1",
            "from": "",
            "savestate": "7",
            "useticket": "1",
            "pagerefer": "http://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=http%3A%2F%2Fweibo.com%2F&domain=.weibo.com&ua=php-sso_sdk_client-0.6.14",
            "vsnf": "1",
            "su": self.get_encrypted_name(),
            "service": "miniblog",
            "servertime": raw['servertime'],
            "nonce": raw['nonce'],
            "pwencode": "rsa2",
            "rsakv": raw['rsakv'],
            "sp": self.get_encrypted_pw(raw),
            "sr": "1280*800",
            "encoding": "UTF-8",
            "prelt": "77",
            "url": "http://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack",
            "returntype": "META"
        }

        data = urllib.parse.urlencode(post_data).encode('utf-8')

        return data

    def login(self):

        url = 'http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.19)'

        self.enable_cookies()

        data = self.get_prelogin_args()

        post_data = self.build_post_data(data)

        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
        }

        try:

            request = urllib.request.Request(url=url, data=post_data, headers=headers)

            response = urllib.request.urlopen(request)

            html = response.read().decode('GBK')

            '''
            一开始用的是utf－8解码，然而得到的数据很丑陋，却隐约看见一个GBK字样。所以这里直接采用GBK解码
            '''

            # print(html)
        except urllib.error as e:

            print(e.code)

        p = re.compile('location\.replace\(\'(.*?)\'\)')

        p2 = re.compile(r'"userdomain":"(.*?)"')

        try:

            login_url = p.search(html).group(1)

            # print(login_url)

            request = urllib.request.Request(login_url)

            response = urllib.request.urlopen(request)

            page = response.read().decode('utf-8')

            # print(page)

            login_url = 'http://weibo.com/' + p2.search(page).group(1)

            request = urllib.request.Request(login_url)

            response = urllib.request.urlopen(request)

            # final = response.read().decode('utf-8')

            print('Login success!')

        except:

            print('Login error!')

            return 0


if __name__ == "__main__":

    user_file = open('./user.info', 'r')

    username = user_file.readline().strip('\n')

    passwd = user_file.readline()

    # print(username)
    #
    # print(passwd)

    launcher = Launcher(username, passwd)

    launcher.login()