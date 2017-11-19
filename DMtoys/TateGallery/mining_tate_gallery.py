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


def number_of_artist_and_artwork(data_list):

    artists_count = {}

    artwork_count = {}

    for record in data_list:

        if record['artist'] in artists_count:

            artists_count[record['artist']] += 1

        else:

            artists_count[record['artist']] = 1

        if record['id'] in artwork_count:

            artwork_count[record['id']] += 1

        else:

            artwork_count[record['id']] = 1

    if len(artwork_count) != len(data_list):

        raise Exception('Statistic Mismatch!')

    return artists_count, artwork_count


if __name__ == '__main__':

    data_list = load_data('data/artwork_data.csv')

    artist_counter, artwork_counter = number_of_artist_and_artwork(data_list)

    print("Number of Artist: %d, Number of Artwork: %d." % (len(artist_counter), len(artwork_counter)))

    result = sorted(artist_counter.items(), key= lambda a_pair: a_pair[1], reverse= True)

    top_count = 0

    for (name, count) in result:

        print("Artist: %s, Number of his/her works: %d." % (name, count))

        top_count += 1

        if top_count == 10:

            break

    print("Warhol, Andy has %d works in Tate." % artist_counter['Warhol, Andy'])