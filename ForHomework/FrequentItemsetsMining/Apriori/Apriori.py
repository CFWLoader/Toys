'''
 Attribute Information:
   1. Class Name: 2 (democrat, republican)
   2. handicapped-infants: 2 (y,n)
   3. water-project-cost-sharing: 2 (y,n)
   4. adoption-of-the-budget-resolution: 2 (y,n)
   5. physician-fee-freeze: 2 (y,n)
   6. el-salvador-aid: 2 (y,n)
   7. religious-groups-in-schools: 2 (y,n)
   8. anti-satellite-test-ban: 2 (y,n)
   9. aid-to-nicaraguan-contras: 2 (y,n)
  10. mx-missile: 2 (y,n)
  11. immigration: 2 (y,n)
  12. synfuels-corporation-cutback: 2 (y,n)
  13. education-spending: 2 (y,n)
  14. superfund-right-to-sue: 2 (y,n)
  15. crime: 2 (y,n)
  16. duty-free-exports: 2 (y,n)
  17. export-administration-act-south-africa: 2 (y,n)
'''


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


class Apriori:

    def __init__(self, records, min_sup, gen_report_mode=False):

        self.records = records

        self.min_sup = min_sup

        self.gen_report_mode = gen_report_mode

        self.gen_candidate = 0 if gen_report_mode else None


    def find_frequent_1_itemsets(self):

        itemsets = []

        for record in self.records:

            for element in record:

                if [element] not in itemsets:
                    itemsets.append([element])

        itemsets = map(frozenset, itemsets)

        itemsets_with_count = {}

        for candidate in itemsets:

            for record in self.records:

                if candidate.issubset(record):

                    if candidate in itemsets_with_count:

                        itemsets_with_count[candidate] += 1

                    else:

                        itemsets_with_count[candidate] = 1

        qualified_itemsets = {}

        for key, val in itemsets_with_count.items():

            if val >= self.min_sup:

                qualified_itemsets[key] = val

        return qualified_itemsets


    def has_infrequent_set(self, un_set, frozen_set):

        unfrozen_un = set(un_set)

        for ele in unfrozen_un:

            sub_k_1_set = unfrozen_un.copy()

            sub_k_1_set.remove(ele)

            sub_k_1_set = frozenset(sub_k_1_set)

            if sub_k_1_set not in frozen_set:

                return True

        return False


    def apriori_gen(self, lk):

        frozen_set = lk.keys()

        if len(frozen_set) <= 0:

            return []

        for ele in frozen_set: set_size = len(ele) + 1; break

        gen_set = []

        for ele1 in frozen_set:

            for ele2 in frozen_set:

                if not (ele1.issubset(ele2) and ele1.issuperset(ele2)):

                    un_set = ele1.union(ele2)

                    if len(un_set) == set_size and un_set not in gen_set and not self.has_infrequent_set(un_set, frozen_set):

                        gen_set.append(un_set)

                        if self.gen_report_mode: self.gen_candidate += 1

        return gen_set


    def apriori(self):

        l1 = self.find_frequent_1_itemsets()

        # l2 = apriori_gen(l1)
        #
        # # print(l2)
        #
        # count_set = {}
        #
        # for ele in l2:
        #
        #     count_set[ele] = 0
        #
        #     for record in record_set:
        #
        #         if ele.issubset(record):
        #
        #             count_set[ele] += 1
        #
        # print(len(count_set))
        #
        # result_set = {}
        #
        # for ele in count_set:
        #
        #     if count_set[ele] >= min_sup:
        #
        #         result_set[ele] = count_set[ele]
        #
        # print(len(result_set))
        L = [l1]

        k = 1

        while len(L[k - 1]) > 0:

            ck = self.apriori_gen(L[k - 1])

            count_set = {}

            verified_count_set = {}

            for candidate in ck:

                count_set[candidate] = 0

                for record in self.records:

                    if candidate.issubset(record):

                        count_set[candidate] += 1

            for key, val in count_set.items():

                if val >= self.min_sup:

                    verified_count_set[key] = val

            L.append(verified_count_set.copy())

            count_set.clear()

            verified_count_set.clear()

            k += 1

        return L


if __name__ == '__main__':

    vote_records = load_data('../data_src/house-votes-84.data')

    apio = Apriori(vote_records, int(0.4 * len(vote_records)), True)

    result = apio.apriori()

    for ele in result:

        print(ele)

    print('Gen cans:', apio.gen_candidate)