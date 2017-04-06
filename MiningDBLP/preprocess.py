import codecs
from xml.sax import handler, make_parser

paper_tag = ('article', 'inproceedings', 'proceedings', 'book', 'incollection', 'phdthesis', 'mastersthesis', 'www')

class LoadHandler(handler.ContentHandler):

    def __init__(self, result):

        super().__init__()

        self.result = result

        self.flag = 0

    def startDocument(self):

        print('Document Start.')

    def endDocument(self):

        print('Document End.')

    def startElement(self, name, attrs):

        if name == 'author':

            self.flag = 1

    def endElement(self, name):

        if name == 'author':

            self.result.write('\r\n')

            self.flag = 0

        if name in paper_tag:

            self.result.write('\r\n')


    def characters(self, content):

        if self.flag:

            self.result.write(content)

def parseDblpXml(source, result):

    temp_handler = LoadHandler(result)

    parser = make_parser()

    parser.setContentHandler(temp_handler)

    parser.parse(source)

if __name__ == '__main__':

    source = codecs.open('dblp.xml', 'r', 'utf-8')

    result = codecs.open('authors.txt', 'w', 'utf-8')

    parseDblpXml(source, result)

    result.close()

    source.close()