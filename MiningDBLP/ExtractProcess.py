__author__ = 'CFWLoader'

from xml.sax import handler, make_parser
import codecs


PAPER_TAGS = (
    'article', 'inproceedings', 'proceedings', 'book', 'incollection', 'phdthesis', 'mastersthesis', 'www', 'person',
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


def load_proceeded_dblp(filename, get_year=True, limit=None):

    src_file = codecs.open(filename, 'r', 'utf-8')

    dataset = []

    if limit is None:

        for line in src_file:

            tupled = line.strip(',\r\n').split(',')

            if not get_year: tupled.pop()

            dataset.append(tupled)

    else:

        counter = 0

        for line in src_file:

            tupled = line.strip(',\r\n').split(',')

            if not get_year: tupled.pop()

            dataset.append(tupled)

            counter += 1

            if counter == limit: break

    src_file.close()

    return dataset


def load_proceeded_digitized_dblp(filename, get_year=True, limit=None):

    src_file = codecs.open(filename, 'r', 'utf-8')

    dataset = []

    if limit is None:

        for line in src_file:

            tupled = line.strip(',\r\n').split(',')

            digit_list = []

            if not get_year: tupled.pop()

            for ele in tupled:

                digit_list.append(int(ele))

            dataset.append(digit_list)

    else:

        counter = 0

        for line in src_file:

            tupled = line.strip(',\r\n').split(',')

            digit_list = []

            if not get_year: tupled.pop()

            for ele in tupled:

                digit_list.append(int(ele))

            dataset.append(digit_list)

            counter += 1

            if counter == limit: break

    src_file.close()

    return dataset


def digitize_string(src_filename, dest_filename, map_record_filename):

    src_file = codecs.open(src_filename, 'r', 'utf-8')

    dest_file = codecs.open(dest_filename, 'w', 'utf-8')

    map_record_file = codecs.open(map_record_filename, 'w', 'utf-8')

    name_map = {}

    counter = 1

    for line in src_file:

        tupled = line.strip(',\r\n').split(',')

        target_str = ''

        year = tupled.pop()

        for ele in tupled:

            if ele not in name_map:

                name_map[ele] = counter

                counter += 1

            target_str += '%d,' % counter

        target_str += year

        print(target_str, file=dest_file)


    for k, v in name_map.items():

        print('%s,%d' % (k, v), file=map_record_file)


    src_file.close()

    dest_file.close()

    map_record_file.close()

    return name_map

if __name__ == '__main__':
    # source = codecs.open('sample.xml', 'r', 'utf-8')
    # source = codecs.open('dblp.xml', 'r', 'utf-8')
    #
    # result = codecs.open('proceeded.txt', 'w', 'utf-8')
    #
    # parserDblpXml(source, result)
    #
    # result.close()
    #
    # source.close()

    digitize_string('./proceeded.txt', './proceeded_digit.txt', 'name_map.txt')