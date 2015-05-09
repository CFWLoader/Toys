//
// Created by cfwloader on 5/9/15.
//

#ifndef CHARGECOUNTINGSYSTEM_CHARGEFUNCTION_H
#define CHARGECOUNTINGSYSTEM_CHARGEFUNCTION_H

typedef struct TheTime {
    int year;
    int month;
    int day;
    int hour;
    int minute;
} TheTime;

static const double DAY_CHARGE_FIRST_HOUR_A = 2.5;
static const double DAY_CHARGE_NORMAL_A = 3.75;
static const double NIGHT_CHARGE_A = 1;

static const double DAY_CHARGE_FIRST_HOUR_B = 5;
static const double DAY_CHARGE_NORMAL_B = 7.5;
static const double NIGHT_CHARGE_B = 2;

double getCharge(char carType, char *startTimeString, char *endTimeString);

double aTypeCharge(TheTime *startTime, TheTime *endTime);

double bTypeCharge(TheTime *startTime, TheTime *endTime);

int getTheTimeByString(char *timeString, struct TheTime *theTime);

int getIntValueByString(char *string, int startIndex, int endIndex);

//Due to the specified requirement, the interval of hour can be calculated via an equivalent rule.
//But it seem can be replaced with a simple statement.
//int equivalentizeTheHour(int hour);

double getCharge(char carType, char *startTimeString, char *endTimeString) {

    TheTime startTime, endTime;

    if (getTheTimeByString(startTimeString, &startTime) != 0 ||
        getTheTimeByString(endTimeString, &endTime) != 0) {
        fprintf(stderr, "Error happend in time type cast.");
        return -1.0;
    }

    if (carType == 'A')return aTypeCharge(&startTime, &endTime);
    if (carType == 'B')return bTypeCharge(&startTime, &endTime);

    return -2.0;
}

double aTypeCharge(TheTime *startTime, TheTime *endTime) {

    double charge = 0;

    int duration;
    int leftPart;
    int tail;
    //Over days calculation.

    //Calculating the part less than 24 hours.
    //You have to calculate the charge time duration.
    //So disgusting.You have to handle 3 durations though is just one day.
    //I solve the problem via equivalent the time.
    //I equivalentize the night time from 21 to 0. It means we can just minus the hour time.
    //If the result is negative, we can assume it must park in the parking lot over a day and we add a day time fees to it.
    int startHour = (startTime->hour + 3) % 24;//equivalentizeTheHour(startTime->hour);
    int endHour = (endTime->hour + 3) % 24;//equivalentizeTheHour(endTime->hour);

    //printf("\nstart: %d  end: %d  duration: %d\n", startHour, endHour, endHour - startHour);

    //Finally, We have to use if-else-if-else.
    if (startHour < 8) {
        if (endHour < 8) {
            duration = endHour - startHour;

            tail = duration % 2;

            charge += (duration / 2 + tail) * NIGHT_CHARGE_A;
        } else {
            duration = 8 - endHour;

            tail = duration % 2;

            charge += (duration / 2 + tail) * NIGHT_CHARGE_A;
        }
    } else {

    }
    /*
    duration = endHour - startHour;

    if (duration > 0) {
        tail = duration % 2;

        charge += (duration / 2 + tail) * NIGHT_CHARGE_A;
    } else {
        //Add a full day time.
        charge += DAY_CHARGE_FIRST_HOUR_A * 4 + DAY_CHARGE_NORMAL_A * 4 * 13;

        duration = -duration;

        tail = duration % 2;

        charge += (duration / 2 + tail) * NIGHT_CHARGE_A;
    }
     */
    /*
    if (startTime->hour >= 20) {
        //Start from night.

        duration = (endTime->hour - startTime->hour);

        duration = (duration > 0) ? duration : duration + 24;

        //Notice the little part of time.
        tail = duration % 2;

        duration = duration / 2 + tail;

        charge += duration * NIGHT_CHARGE_A;

        //Test
        leftPart = endTime->hour % 12 - 7;

        if(leftPart < 0)return charge;
    }
     */

    return charge;
}

double bTypeCharge(TheTime *startTime, TheTime *endTime) {
    //Over days calculation.

    //Calculating the part less than 24 hours.
    return 0;
}

//Using pointer for leaving the return value for return code.
//The return code is for error detection.
int getTheTimeByString(char *timeString, struct TheTime *theTime) {
    if (theTime == NULL) {
        fprintf(stderr, "The pointer is null.");
        return -1;
    }

    theTime->year = getIntValueByString(timeString, 0, 3);

    theTime->month = getIntValueByString(timeString, 5, 6);

    theTime->day = getIntValueByString(timeString, 8, 9);

    theTime->hour = getIntValueByString(timeString, 11, 12);

    theTime->minute = getIntValueByString(timeString, 14, 15);

    return 0;
}

int getIntValueByString(char *string, int startIndex, int endIndex) {

    int index = startIndex - 1;
    int value = 0;

    while (++index <= endIndex) {
        if (string[index] < '0' || string[index] > '9') {
            fprintf(stderr, "The format is wrong.");
            return -2;
        }

        value = value * 10 + string[index] - '0';
    }

    return value;
}

/*
int equivalentizeTheHour(int hour) {
    //return (hour + 24) % 21;
    if (hour < 21) {
        return hour + 3;
    } else {
        return hour - 21;
    }
}
 */

#endif //CHARGECOUNTINGSYSTEM_CHARGEFUNCTION_H
