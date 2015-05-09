//
// Created by cfwloader on 5/9/15.
//

#ifndef CHARGECOUNTINGSYSTEM_DATECOUNT_H
#define CHARGECOUNTINGSYSTEM_DATECOUNT_H

typedef struct TheTime {
    int year;
    int month;
    int day;
    int hour;
    int minute;
} TheTime;

//The codes of counting days between dates are copy from internet.
int isLeapYear(short year);

int daysOfOneYear(struct TheTime theTime);

int timeToTime(struct TheTime theTime);

int isLeapYear(short year) {
    return year % 4 == 0 && year % 100 || year % 400 == 0;
}

int daysOfOneYear(struct TheTime theTime) {
    switch (theTime.month - 1) {
        case 11:
            theTime.day += 30;
        case 10:
            theTime.day += 31;
        case 9:
            theTime.day += 30;
        case 8:
            theTime.day += 31;
        case 7:
            theTime.day += 31;
        case 6:
            theTime.day += 30;
        case 5:
            theTime.day += 31;
        case 4:
            theTime.day += 30;
        case 3:
            theTime.day += 31;
        case 2:
            theTime.day += isLeapYear(theTime.year) ? 29 : 28;
        case 1:
            theTime.day += 31;
    }
    return theTime.day;
}

int timeToTime(struct TheTime theTime) {

    int years = theTime.year - 1;

    int days = years * 365 + years / 4 - years / 100 + years / 400;

    days += daysOfOneYear(theTime);

    return days;
}

#endif //CHARGECOUNTINGSYSTEM_DATECOUNT_H
