__author__ = 'CFWLoader'

import random
import numpy

salary_statistic = []

for count in range(0, 1000, 1):
    salary_statistic.append(random.randrange(1500, 35000, 50))

salary_statistic.sort()

statistic_interval = 500

upper_bound = 3500

statistic_buckets = []

while statistic_interval <= upper_bound:

    end_line = statistic_interval

    interval_count = 0

    current_bucket = []

    for ele in salary_statistic:

        if ele < end_line:

            interval_count += 1

        else:

            current_bucket.append(interval_count)

            interval_count = 0

            end_line += statistic_interval

    current_bucket.append(interval_count)

    statistic_buckets.append(current_bucket)

    statistic_interval += 500

std_collector = []

for ele in statistic_buckets:

    std_collector.append(numpy.std(ele))

print(std_collector)

# sc_mean = numpy.mean(std_collector)
#
# idx = 0
#
# marked_idx = 0
#
# dt = numpy.abs(sc_mean - std_collector[0])
#
# for element in std_collector:
#
#     if numpy.abs(sc_mean - element) < dt:
#
#         marked_idx = idx
#
#     idx += 1
#
# print(marked_idx, '-', std_collector[marked_idx], '-', sc_mean - std_collector[marked_idx])