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


def transpose_dataset(dataset, min_sup = 0):

    transed_dta = {}

    record_idx = 0

    for record in dataset:

        for ele in record:

            if frozenset({ele}) in transed_dta:

                transed_dta[frozenset({ele})].add(record_idx)

            else:

                transed_dta[frozenset({ele})] = {record_idx}

        record_idx += 1

    qualified_data = {}

    for k, v in transed_dta.items():

        if len(v) >= min_sup:

            qualified_data[k] = v

    return qualified_data


def eclat(dataset, min_sup=0):

    gen_candidate = 0

    tran_data = transpose_dataset(dataset, min_sup)

    k_sets = [tran_data]

    frequent_itemsets = []

    frequent_item_list = []

    for rec, val in tran_data.items():

        frequent_item_list.append((rec, len(val)))

    frequent_itemsets.append(frequent_item_list.copy())

    k = 1

    while len(k_sets[k - 1]) > 0:

        k_1_set = k_sets[k - 1]

        k_set = {}

        for k1, v1 in k_1_set.items():

            for k2, v2 in k_1_set.items():

                new_key = k1.union(k2)

                if len(new_key) == (k + 1) and new_key not in k_set:

                    intersec = v1.intersection(v2)

                    gen_candidate += 1

                    if len(intersec) >= min_sup:

                        k_set[new_key] = intersec

        frequent_item_list.clear()

        for rec, val in k_set.items():

            frequent_item_list.append((rec, len(val)))

        frequent_itemsets.append(frequent_item_list.copy())

        k_sets.append(k_set)

        k += 1

    return frequent_itemsets, len(tran_data), gen_candidate


if __name__ == '__main__':

    dataset = load_data('../data_src/house-votes-84.data')

    result, tl, gl = eclat(dataset, int(0.5 * len(dataset)))

    for k in result:

        print(k)

    print(tl, gl)