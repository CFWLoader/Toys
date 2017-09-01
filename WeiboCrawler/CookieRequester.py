from selenium import webdriver

chromePath = r'/home/CFWLoader/Softwares/chromedriver'

wd = webdriver.Chrome(executable_path= chromePath)

login_url = 'http://weibo.com/login.php'

wd.get(login_url)

# Username!!!
wd.find_element_by_xpath('//*[@id="loginname"]').send_keys(username)

# Password!!!
wd.find_element_by_xpath('//*[@id="pl_login_form"]/div/div[3]/div[2]/div/input').send_keys(password)

wd.find_element_by_xpath('//*[@id="pl_login_form"]/div/div[3]/div[6]/a').click()

import requests

req = requests.Session()

cookies = wd.get_cookies()

for cookie in cookies:
    req.cookies.set(cookie['name'], cookie['value'])


test = req.get('http://weibo.com/u/2030522687/home?wvr=5&lf=reg')