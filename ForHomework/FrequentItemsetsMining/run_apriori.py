__author__ = 'CFWLoader'

from data_src.dataset_loaders import DATASET_ENTRYS, load_data
from Apriori.Apriori import Apriori
import datetime


if __name__ == '__main__':

    performance_report = open('./Apriori/logs/performance_report.txt', 'w')

    for dta_ent in DATASET_ENTRYS:

        dataset = load_data(dta_ent[1], dta_ent[2], dta_ent[3])

        dataset_len = len(dataset)

        performance_report.write('Operations on %s, Number of records: %d.\n\n' % (dta_ent[0], dataset_len))

        for min_sup in range(3, 10):

            apri = Apriori(dataset, int(min_sup * dataset_len / 10), True)

            start_time = datetime.datetime.now()

            result = apri.apriori()

            end_time = datetime.datetime.now()

            result_detail_file = open('./Apriori/logs/apriori_on_%s_min_sup_%d.txt' % (dta_ent[0], int(min_sup * dataset_len / 10)), 'w')

            result_counter = 0

            for ele in result:

                print(ele, file=result_detail_file)

                result_counter += len(ele)

            result_detail_file.close()

            performance_report.write('Minimum Support: %.2f, runtime: %d ms, generated candidates: %d, Find %d frequent itemsets.\n'
                                     % (min_sup /10, (end_time - start_time).microseconds, apri.gen_candidate, result_counter))


    performance_report.close()
