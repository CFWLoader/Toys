__author__ = 'CFWLoader'

import random

salary_statistic = []

for count in range(0, 1000, 1):
    salary_statistic.append(random.randrange(1500, 35000, 50))

salary_statistic.sort()

bucket_size = 20

buckets = []

bucketed_count = 0

start_data = salary_statistic[0]

for ele in salary_statistic:

    bucketed_count += 1

    if bucketed_count == 20:

        buckets.append((start_data, ele, 20))

        start_data = ele

        bucketed_count = 0

layers = [buckets]

layer_level = 0

while int(len(layers[layer_level]) / 2) > 0:

    current_layer = layers[layer_level]

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

    layers.append(next_layer)

    layer_level += 1

for layer_level in range(0, len(layers)):

    if len(layers[layer_level]) < 10:

        print(layers[layer_level])