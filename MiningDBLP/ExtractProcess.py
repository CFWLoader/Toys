__author__ = 'CFWLoader'

import xml.sax
import io, sys


PAPER_TAGS = (
    'article', 'inproceedings', 'proceedings', 'book', 'incollection', 'phdthesis', 'mastersthesis', 'www', 'person',
    'data')

SUB_TAGS = ('publisher', 'journal', 'booktitle')

ret = []


class DBLPHandler(xml.sax.ContentHandler):
    def __init__(self):

        self.id = 1

        self.reset()

    def reset(self):

        self.dup_article = 0

        self.curtag = None

        self.author = ''

        self.title = ''

        self.pages = ''

        self.year = ''

        self.volume = ''

        self.journal = ''

        self.number = ''

        self.url = ''

        self.ee = ''

    def write_to_file(self, filename):

        file_obj = open(filename, 'w')

        for line in ret:
            file_obj.write(line.encode('utf8'))

        file_obj.close()

    def record_row(self):

        ret.append(u''.join((self.author, self.title, self.year, self.pages, self.journal, self.ee, '\n')).replace(' ', ''))

    def start_element(self, tag, attributes):

        if tag != None and len(tag.strip()) > 0:

            if tag == 'article':
                self.dup_article += 1

            self.curtag = tag

    def end_element(self, tag):

        if tag != None and len(tag.strip()) > 0:

            if tag == 'article':
                self.record_row()

                self.reset()

    def characters(self, content):

        if content != '\n':

            if self.curtag == "title":

                self.title = content.strip()

            elif self.curtag == "author":

                self.author = content.strip()

            elif self.curtag == "year":

                self.year = content.strip()

            elif self.curtag == "ee":

                self.ee = content.strip()

            elif self.curtag == "journal":

                self.journal = content.strip()

            elif self.curtag == "pages":

                self.pages = content.strip()

            elif self.url == "url":

                self.url = content.strip()

            elif self.number == "number":

                self.number = content.strip()

            elif self.number == "volume":

                self.volume = content.strip()


if __name__ == '__main__':

    filename = 'sample.xml'

    if sys.argv == 2:

        filename = sys.argv[1]

    parser = xml.sax.make_parser()

    parser.setFeature(xml.sax.handler.feature_namespaces, 0)

    handler = DBLPHandler()

    parser.setContentHandler(handler)

    parser.parse(filename)

    print('Parsed.')

    handler.write_to_file('proceeded.txt')