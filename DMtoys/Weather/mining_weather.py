import csv
import matplotlib.pyplot as plt
from windrose import WindroseAxes

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


def plot_item(data_tuples, item_index, ave = None, var = None):

    x = range(len(data_tuples))

    y = []

    y_ave = [ave] * len(data_tuples) if ave is not None else []

    y_var_up = [ave + var] * len(data_tuples) if var is not None else []

    y_var_low = [ave - var] * len(data_tuples) if var is not None else []

    for idx, tup in enumerate(data_tuples):

        # x.append(idx)

        y.append(tup[item_index])

    # plt.scatter(x, y, label= 'Showing')

    plt.plot(x, y, label='Val.')

    if ave is not None:

        plt.plot(x, y_ave, label='Ave.')

    if var is not None:

        plt.plot(x, y_var_up, label='Var+')

        plt.plot(x, y_var_low, label='Var-')

    plt.xlabel('Timestamp')

    plt.ylabel('Value')

    plt.title('Every Day Weather')

    plt.legend()

    plt.show()


def plot_weather_statics1(data_tuples):

    data_len = len(data_tuples)

    x = range(data_len)

    ap = [(lambda x:x[1])(var) for var in data_tuples]

    ave = average(data_tuples, 1)

    var = variance(data_tuples, 1, ave)

    ap_ave = [ave] * data_len

    ap_var_u = [ave + var] * data_len

    ap_var_l = [ave - var] * data_len

    rain = [(lambda x:x[2])(var) for var in data_tuples]

    ave = average(data_tuples, 2)

    var = variance(data_tuples, 2, ave)

    rain_ave = [ave] * data_len

    rain_var_u = [ave + var] * data_len

    rain_var_l = [ave - var] * data_len

    ws =  [(lambda x:x[3])(var) for var in data_tuples]

    ave = average(data_tuples, 3)

    var = variance(data_tuples, 3, ave)

    ws_ave = [ave] * data_len

    ws_var_u = [ave + var] * data_len

    ws_var_l = [ave - var] * data_len

    wd = [(lambda x:x[4])(var) for var in data_tuples]

    ave = average(data_tuples, 4)

    # var = variance(data_tuples, 4, ave)

    wd_ave = [ave] * data_len

    # wd_var_u = [ave + var] * data_len
    #
    # wd_var_l = [ave - var] * data_len

    # st = []
    #
    # rh = []
    #
    # sf = []
    #
    # bat = []

    plt.figure()

    p1 = plt.subplot(221)

    p2 = plt.subplot(222)

    p3 = plt.subplot(223)

    p4 = plt.subplot(224)

    p1.plot(x, ap)
    p1.plot(x, ap_ave)
    p1.plot(x, ap_var_u)
    p1.plot(x, ap_var_l)
    p1.set_title('Atmospheric Pressure (mBar)')

    p2.plot(x, rain)
    p2.plot(x, rain_ave)
    p2.plot(x, rain_var_u)
    p2.plot(x, rain_var_l)
    p2.set_title('Rainfall (mm)')

    p3.plot(x, ws)
    p3.plot(x, ws_ave)
    p3.plot(x, ws_var_u)
    p3.plot(x, ws_var_l)
    p3.set_title('Wind Speed (m/s)')

    p4.plot(x, wd)
    p4.plot(x, wd_ave)
    # p4.plot(x, wd_var_u)
    # p4.plot(x, wd_var_l)
    p4.set_title('Wind Direction (degrees)')

    p1.legend()
    p2.legend()
    p3.legend()
    p4.legend()

    plt.show()


def show_outliers(data_tuples, data_item_index):

    data_len = len(data_tuples)

    ave = average(data_tuples, data_item_index)

    var = variance(data_tuples, data_item_index, ave)

    for multiple_val in range(1, 10):

        print('Threshold = ', var * multiple_val, ' Multiple = ', multiple_val, end='')

        outliers_arr = outliers(data_tuples, data_item_index, var * multiple_val, ave)

        print(', Outliers = ', len(outliers_arr), ' Percentage = ', len(outliers_arr) / data_len * 100, '%')


def show_wind_rose(data_tuples):

    ws = [(lambda x: x[3])(var) for var in data_tuples]

    wd = [(lambda x: x[4])(var) for var in data_tuples]

    ax = WindroseAxes.from_ax()

    ax.bar(wd, ws, normed=True, opening=0.8, edgecolor='white')

    ax.set_legend()

    plt.show()


if __name__ == '__main__':

    data = load_data('data/JCMB_2015.csv')

    # plot_weather_statics1(data)

    # ap = [(lambda x:x[1])(tup) for tup in data]

    # print(ap[1])

    # for idx, tup in enumerate(data):
    #
    #     if tup[3] == 0 and tup[4] != 0 or tup[3] != 0 and tup[4] == 0:
    #
    #         print(idx, ' WS:', tup[3], ' WD:', tup[4])

    # data_len = len(data)
    #
    # data_item_index = 3

    # plot_item(data, data_item_index, average(data, data_item_index), variance(data, data_item_index))

    show_wind_rose(data)