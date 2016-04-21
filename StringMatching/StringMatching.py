__author__ = 'cfwloader'

import re

testFile = open("Texts.txt")

# fullText = testFile.read()

for line in testFile:
    matcher = re.search('class ', line)

    if matcher != None:
        print matcher.group()


testFile.close()

# print fullText