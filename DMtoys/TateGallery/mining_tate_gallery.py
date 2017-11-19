import csv


def load_data(file_path, fields = None):

    file = open(file_path, 'r', encoding= 'utf_8_sig')

    # fileds = ['id',
    #           'accession_number',
    #           'artist',
    #           'artistRole',
    #           'artistId',
    #           'title',
    #           'dateText',
    #           'medium',
    #           'creditLine',
    #           'year',
    #           'acquisitionYear',
    #           'dimensions',
    #           'width',
    #           'height',
    #           'depth',
    #           'units',
    #           'inscription',
    #           'thumbnailCopyright',
    #           'thumbnailUrl',
    #           'url']

    reader = csv.DictReader(file, fields)

    static_lst = []

    for obj in reader:
        static_lst.append(obj)

    file.close()

    return static_lst


# def number_of_artist


if __name__ == '__main__':

    data_list = load_data('data/artwork_data.csv')

    print(data_list[0]['id'])
    print(data_list[1]['id'])
    print('Just for a commit.')
