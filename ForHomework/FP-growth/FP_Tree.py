from fptools import FpTree


def translate_record(record):
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


def load_data(file_path):
    src_data = open(file_path)

    votes_records = []

    for line in src_data:
        votes_records.append(translate_record(line.strip('\n').split(',')))

    src_data.close()

    return votes_records


def find_frequent_1_itemsets(vote_records, min_sup=0):

    itemsets = []

    for record in vote_records:

        for element in record:

            if element not in itemsets:
                itemsets.append(element)

    itemsets_with_count = {}

    for candidate in itemsets:

        for record in vote_records:

            if candidate in record:

                if candidate in itemsets_with_count:

                    itemsets_with_count[candidate] += 1

                else:

                    itemsets_with_count[candidate] = 1

    qualified_itemsets = {}

    for key, val in itemsets_with_count.items():

        if val >= min_sup:

            qualified_itemsets[key] = val

    return qualified_itemsets


def gen_fp_tree(dataset):

    frequent_list = find_frequent_1_itemsets(dataset)

    frequent_list = sorted(frequent_list.items(), key=lambda d: d[1], reverse=True)

    fp_tree = FpTree(frequent_list)

    for record in data_set:

        fp_tree.absorb_pattern(record)

    return fp_tree


def FP_growth(fp_tree):

    pass


if __name__ == '__main__':

    data_set = load_data('./house-votes-84.data')

    tree = gen_fp_tree(data_set)

