__author__ = 'CFWLoader'

from ExtractProcess import load_proceeded_dblp


dataset = load_proceeded_dblp('./proceeded.txt')

print(len(dataset))
