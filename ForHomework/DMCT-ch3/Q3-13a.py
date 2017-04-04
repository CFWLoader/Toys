__author__ = 'CFWLoader'

COUNTRY = ['China']

PROVINCE_OR_STATE = ['Shaanxi','Guangdong', 'Sichuan', 'Jiangsu']

CITY = ['Beijing', 'Xian', 'Xianyang', 'Guangzhou', 'Baoji', 'Chengdu', 'Nanjing']

STREET = ['Donghuashi', 'Chongwenmen', 'Dongzhimen', 'Beiyuanmen', 'Chang\'an', 'Beidajie', 'Xilanlu', 'Gudu',
          'Baiyun', 'Datang', 'Jianshe', 'Jinling', 'Qiaonan', 'Shaocheng', 'Xiyuhe', 'Jiankang', 'Fenghuang']

layer = [('City', len(CITY), CITY),
         ('Country', len(COUNTRY), COUNTRY),
         ('Street', len(STREET), STREET),
         ('Province_or_State', len(PROVINCE_OR_STATE), PROVINCE_OR_STATE)]

layer.sort(key = lambda layer: layer[1])

for ele in layer:
    print(ele[0])

