__author__ = 'CFWLoader'

from xml.sax import handler, make_parser
import codecs


PAPER_TAGS = ('article', 'inproceedings', 'proceedings', 'book', 'incollection', 'phdthesis', 'mastersthesis', 'www', 'person',
    'data')


class DBLPHandler(handler.ContentHandler):
    def __init__(self, result):

        super().__init__()

        self.result = result

        self.flag = False

    def startDocument(self):

        print('Document Start.')

    def endDocument(self):

        print('Document End.')

    def startElement(self, name, attrs):

        if name == 'author' or name == 'year':

            self.flag = True

    def endElement(self, name):

        if name == 'author' or name == 'year':

            self.result.write(',')

            self.flag = False

        if name in PAPER_TAGS:

            self.result.write('\r\n')

    def characters(self, content):

        if self.flag:

            self.result.write(content)


def parserDblpXml(source, result):

    handler = DBLPHandler(result)

    parser = make_parser()

    parser.setContentHandler(handler)

    parser.parse(source)


def load_proceeded_dblp(filename):

    src_file = codecs.open(filename, 'r', 'utf-8')

    dataset = []

    for line in src_file:

        tupled = line.strip(',\r\n').split(',')

        dataset.append(tupled)

    return dataset


if __name__ == '__main__':

   #source = codecs.open('sample.xml', 'r', 'utf-8')
   source = codecs.open('dblp.xml', 'r', 'utf-8')

   result = codecs.open('proceeded.txt', 'w', 'utf-8')

   parserDblpXml(source, result)

   result.close()

   source.close()