__author__ = 'CFWLoader'

import random

salary_statistic = []

for count in range(0, 1000, 1):
    salary_statistic.append(random.randrange(1500, 35000, 50))

salary_statistic.sort()

count_interval = 500

sal_in_count = 0

interval_statistic = []

for sal_ele in salary_statistic:

    if sal_ele < count_interval:

        sal_in_count += 1

    else:

        interval_statistic.append((count_interval - 500, count_interval - 1, sal_in_count))

        count_interval += 500

        sal_in_count = 1

interval_statistic.append((count_interval - 500, count_interval - 1, sal_in_count))

layer = [interval_statistic]

layer_level = 0

while int(len(layer[layer_level]) / 2) > 0:

    current_layer = layer[layer_level]

    next_layer = []

    for current_layer_count in range(0, len(current_layer), 2):

        if current_layer_count + 1 < len(current_layer):
            next_layer.append((current_layer[current_layer_count][0],
                           current_layer[current_layer_count + 1][1],
                           current_layer[current_layer_count][2] + current_layer[current_layer_count + 1][2]))
        else:
            next_layer.append((current_layer[current_layer_count][0],
                           current_layer[current_layer_count][1],
                           current_layer[current_layer_count][2]))

    layer.append(next_layer)

    layer_level += 1

for layer_level in range(0, len(layer)):

    if len(layer[layer_level]) < 10:

        print(layer[layer_level])