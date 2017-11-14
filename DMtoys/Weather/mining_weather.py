import csv

'''
0 - date-time
1 - atmospheric pressure (mBar)
2 - rainfall (mm)
3 - wind speed (m/s)
4 - wind direction (degrees)
5 - surface temperature (C)
6 - relative humidity (%)
7 - solar flux (Kw/m2)
8 - battery (V)
'''


def load_data(file_path):

    file = open(file_path, 'r')

    reader = csv.reader(file)

    line_counter = 0

    jcmb2015 = []

    for date_time, atmospheric_pressure_mBar, rainfall_mm, wind_speed_m_s, wind_direction_degrees, surface_temperature_C_, relative_humidity, solar_flux_Kw_m2, battery_V in reader:

        line_counter += 1

        if line_counter == 1:
            continue

        jcmb2015.append((date_time,
                         int(atmospheric_pressure_mBar),
                         float(rainfall_mm),
                         float(wind_speed_m_s),
                         float(wind_direction_degrees),
                         float(surface_temperature_C_),
                         float(relative_humidity),
                         float(solar_flux_Kw_m2),
                         float(battery_V)))

    file.close()

    # print(line_counter)

    return jcmb2015


def average(data_tuples, item_index):

    ave_val = 0

    for tup in data_tuples:

        ave_val += tup[item_index]

    return ave_val / len(data_tuples)


def variance(data_tuples, item_index, ave = None):

    ave_val = ave if ave is not None else average(data_tuples, item_index)

    var = 0

    for tup in data_tuples:

        var += (tup[item_index] - ave_val) ** 2

    return var / len(data_tuples)


def outliers(data_tuples, item_index, threshold, ave = None):

    ave_val = ave if ave is not None else average(data_tuples, item_index)

    outliers_ = []

    for idx, tup in enumerate(data_tuples):

        if (tup[item_index] - ave_val) ** 2 > threshold:

            outliers_.append(idx)

    return outliers_


if __name__ == '__main__':

    data = load_data('data/JCMB_2015.csv')

    data_len = len(data)

    data_item_index = 8

    ave = average(data, data_item_index)

    var = variance(data, data_item_index, ave)

    for multiple_val in range(1, 10):

        print('Threshold = ', var * multiple_val, ' Multiple = ', multiple_val, end='')

        outliers_arr = outliers(data, data_item_index, var * multiple_val, ave)

        print(', Outliers = ', len(outliers_arr), ' Percentage = ', len(outliers_arr) / data_len * 100, '%')