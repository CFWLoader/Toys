__author__ = 'CFWLoader'

import random
import numpy

salary_statistic = []

for count in range(0, 1000, 1):
    salary_statistic.append(random.randrange(1500, 35000, 50))

salary_statistic.sort()

statistic_interval = 100

upper_bound = 2000

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

    statistic_interval += 100


for ele in statistic_buckets:

    print(ele)

    print(numpy.std(ele))