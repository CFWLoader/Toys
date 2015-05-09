#include <stdio.h>
#include <stdlib.h>
#include "ChargeFunction.h"

//static FILE* dataSource = stdin;

int testGetTheTimeByString();

int main(int argc, char* argv[]) {

    //testGetTheTimeByString();

    char carType;

    char flag;

    char startTime[20], endTime[20];

    struct TheTime theTime;

    FILE* dataSource = fopen("/run/media/cfwloader/Documents/Project/LittleProjects/ChargeCountingSystem/samples.txt", "r");

    if(dataSource == NULL){
        fprintf(stderr, "Open file failed.");
        exit(EXIT_FAILURE);
    }

    do
    {
        fscanf(dataSource, "%c", &carType);

        fgetc(dataSource);
        fgets(startTime, 17, dataSource);

        fgetc(dataSource);
        fgets(endTime, 17, dataSource);

        flag = fgetc(dataSource);
        //printf("%c %s %s", carType, startTime, endTime);
        printf("Park Info: %c %s %s   Fees: %.2lf\n", carType, startTime, endTime, getCharge(carType, startTime, endTime));

    }while((carType == 'A' || carType == 'B') && flag != EOF);

    fclose(dataSource);
    //testGetTheTimeByString();

    return 0;
}

int testGetTheTimeByString(){

    FILE* dataSource = fopen("/run/media/cfwloader/Documents/Project/LittleProjects/ChargeCountingSystem/samples.txt", "r");

    char carType;

    char flag;

    char startTime[20], endTime[20];

    TheTime theTime;

    do
    {
        fscanf(dataSource, "%c", &carType);

        fgetc(dataSource);
        fgets(startTime, 17, dataSource);

        fgetc(dataSource);
        fgets(endTime, 17, dataSource);

        flag = fgetc(dataSource);
        //printf("%c %s %s", carType, startTime, endTime);
        //printf("Park Info: %c %s %s   Fees: %d\n", carType, startTime, endTime, getCharge(carType, startTime, endTime));

        printf("Car type: %c ", carType);

        getTheTimeByString(startTime, &theTime);
        printf("Start time: %d %d %d %d %d ", theTime.year, theTime.month, theTime.day, theTime.hour, theTime.minute);

        getTheTimeByString(endTime, &theTime);
        printf("End time: %d %d %d %d %d\n\n", theTime.year, theTime.month, theTime.day, theTime.hour, theTime.minute);

    }while((carType == 'A' || carType == 'B') && flag != EOF);

    fclose(dataSource);

}