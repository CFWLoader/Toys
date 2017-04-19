__author__ = 'CFWLoader'


def translate_record_84votes(line):

    record = line.strip('\n').split(',')

    items = []

    if record[0] == 'republican':

        items.append('rep')

    elif record[0] == 'democrat':

        items.append('demo')

    if record[1] == 'y':

        items.append('hci')  # handicapped-infants

    elif record[1] == 'n':

        items.append('hci-n')

    if record[2] == 'y':

        items.append('wpcs')  # water-project-cost-sharing

    elif record[2] == 'n':

        items.append('wpcs-n')

    if record[3] == 'y':
        items.append('aotbr')  # adoption-of-the-budget-resolution

    if record[3] == 'n':
        items.append('aotbr-n')

    if record[4] == 'y':

        items.append('pff')  # physician-fee-freeze

    elif record[4] == 'n':

        items.append('pff-n')

    if record[5] == 'y':

        items.append('esa')  # el-salvador-aid

    elif record[5] == 'n':

        items.append('esa-n')

    if record[6] == 'y':
        items.append('rgis')  # religious-groups-in-schools

    if record[6] == 'n':
        items.append('rgis-n')

    if record[7] == 'y':

        items.append('astb')  # anti-satellite-test-ban

    elif record[7] == 'n':

        items.append('astb-n')

    if record[8] == 'y':

        items.append('atnc')  # aid-to-nicaraguan-contras

    elif record[8] == 'n':

        items.append('atnc-n')

    if record[9] == 'y':

        items.append('mxm')  # mx-missile

    elif record[9] == 'n':

        items.append('mxm-n')

    if record[10] == 'y':

        items.append('imm')  # immigration

    elif record[10] == 'n':

        items.append('imm-n')

    if record[11] == 'y':

        items.append('scc')  # synfuels-corporation-cutback

    elif record[11] == 'n':

        items.append('scc-n')

    if record[12] == 'y':

        items.append('es')  # education-spending

    elif record[12] == 'n':

        items.append('es-n')

    if record[13] == 'y':

        items.append('srts')  # superfund-right-to-sue

    elif record[13] == 'n':

        items.append('srts-n')

    if record[14] == 'y':

        items.append('cri')  # crime

    elif record[14] == 'n':

        items.append('cri-n')

    if record[15] == 'y':
        items.append('dfe')  # duty-free-exports

    if record[15] == 'n':
        items.append('dfe-n')

    if record[16] == 'y':
        items.append('eaasa')  # export-administration-act-south-africa

    if record[16] == 'n':
        items.append('eaasa-n')

    return items


def translate_record_mushroom(mushroom):

    rec = mushroom.strip('\n').split(' ')

    itemset = set()

    for ele in rec:

        if len(ele) > 0:

            itemset.add(int(ele))

    return itemset


def translate_record_retail(line):

    rec = line.strip('\n').split(' ')

    itemset = set()

    for ele in rec:

        if len(ele) > 0:

            itemset.add(int(ele))

    return itemset


def load_data(file_path, trans_method, limit):

    src_data = open(file_path)

    votes_records = []

    if limit is None:

        for line in src_data:
            votes_records.append(trans_method(line))

    else:

        record_count = 0

        for line in src_data:

            votes_records.append(trans_method(line))

            record_count += 1

            if record_count == limit: break

    src_data.close()

    return votes_records


DATASET_ENTRYS = \
    [('house84votes', '/home/CFWLoader/Project/Toys/ForHomework/FrequentItemsetsMining/data_src/house-votes-84.data', translate_record_84votes, None),
    ('mushroom', '/home/CFWLoader/Project/Toys/ForHomework/FrequentItemsetsMining/data_src/mushroom.dat', translate_record_mushroom, None),
    ('retail', '/home/CFWLoader/Project/Toys/ForHomework/FrequentItemsetsMining/data_src/retail.dat', translate_record_retail, 12000)]


if __name__ == '__main__':


    # dataset = load_data('./house-votes-84.data', translate_record_84votes)
    # dataset = load_data('./mushroom.dat', translate_record_mushroom)
    dataset = load_data('./retail.dat', translate_record_retail, 12000)

    print(len(dataset))