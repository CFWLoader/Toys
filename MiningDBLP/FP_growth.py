from fptools import FpTree
from ExtractProcess import load_proceeded_digitized_dblp


def convert_dataset(dataset):

    transed_dataset = {}

    for record in dataset:

        transed_dataset[frozenset(record)] = 1

    return transed_dataset


def find_frequent_1_itemsets(vote_records, min_sup):

    itemsets = []

    for record, cnt in vote_records.items():

        for element in record:

            if element not in itemsets:
                itemsets.append(element)

    itemsets_with_count = {}

    for candidate in itemsets:

        for record, cnt in vote_records.items():

            if candidate in record:

                if candidate in itemsets_with_count:

                    itemsets_with_count[candidate] += cnt

                else:

                    itemsets_with_count[candidate] = cnt

    qualified_itemsets = {}

    for key, val in itemsets_with_count.items():

        if val >= min_sup:

            qualified_itemsets[key] = val

    return qualified_itemsets


def gen_fp_tree(dataset, min_sup=1):

    frequent_list = find_frequent_1_itemsets(dataset, min_sup)

    frequent_list = sorted(frequent_list.items(), key=lambda d: d[1], reverse=True)

    fp_tree = FpTree(frequent_list)

    for record, cnt in data_set.items():

        fp_tree.absorb_pattern(record, cnt)

    return fp_tree


def FP_growth(fp_tree, min_sup=1, prefix=None, fre_item_list=None):

    if fre_item_list is None:

        fre_item_list = {}

    if prefix is None:

        prefix = set()

    for base_ptn, val in fp_tree.fre_list:

        new_fre_set = prefix.copy()

        new_fre_set.add(base_ptn)

        fre_item_list[frozenset(new_fre_set)] = val

        cond_ptn_bases = fp_tree.gen_prefix_paths(base_ptn)

        cond_fp_tree = gen_fp_tree(cond_ptn_bases, min_sup)

        if not cond_fp_tree.is_empty():

            FP_growth(cond_fp_tree, min_sup, new_fre_set, fre_item_list)

    return fre_item_list


if __name__ == '__main__':

    data_set = convert_dataset(load_proceeded_digitized_dblp('./proceeded_digit.txt', False))

    tree = gen_fp_tree(data_set, 150)

    result = FP_growth(tree, 150)

    out_file = open('./fp_result.txt', 'w')

    for k, v in result.items():

        print(k, v, file=out_file)

    out_file.close()