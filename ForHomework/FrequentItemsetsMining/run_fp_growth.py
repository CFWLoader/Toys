__author__ = 'CFWLoader'

from data_src.dataset_loaders import DATASET_ENTRYS
from FP_growth.FP_growth import FP_growth, gen_fp_tree, load_data
import datetime


if __name__ == '__main__':

    performance_report = open('./FP_growth/logs/performance_report.txt', 'w')

    for dta_ent in DATASET_ENTRYS:

        if dta_ent[0] == 'retail': continue

        dataset = load_data(dta_ent[1], dta_ent[2], dta_ent[3])

        dataset_len = len(dataset)

        performance_report.write('Operations on %s, Number of records: %d.\n\n' % (dta_ent[0], dataset_len))

        for min_sup in range(5, 10):

            tree = gen_fp_tree(dataset, int(min_sup * dataset_len / 10))

            start_time = datetime.datetime.now()

            result, gen_cond_bases = FP_growth(tree, int(min_sup * dataset_len / 10))

            end_time = datetime.datetime.now()

            result_detail_file = open('./FP_growth/logs/FPgrowth_on_%s_min_sup_%d.txt' % (dta_ent[0], int(min_sup * dataset_len / 10)), 'w')

            result_counter = 0

            for ele in result:

                print(ele, file=result_detail_file)

                result_counter += len(ele)

            result_detail_file.close()

            performance_report.write('Minimum Support: %.2f, runtime: %d ms, generated conditional bases: %d, Find %d frequent itemsets.\n'
                                     % (min_sup /10, (end_time - start_time).microseconds / 1000, gen_cond_bases, result_counter))


    performance_report.close()