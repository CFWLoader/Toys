#ifndef CONFRESOLVER_H_
#define CONFRESOLVER_H_

struct FunProp
{
	char* key;
	char* funName;
	char* libPath;
	char* funEntry;

	struct FunProp* next;
};

/**
 * Name: 			readConfFile
 * 
 * Function:		Read the configuration file to the program.
 *
 * Parameter: 		confFilePath - The configuration file's physical path.
 *					funProps     - The properties of the functions in dynamical library.
 *
 * Return Value: 	An integer number, Zero denotes successs and negative means error.
 *					Positive number denotes the number of FunProps.
**/
int readConfFile(char* confFilePath, struct FunProp** funProps);

/**
 * Name: 			destroyFunProp
 * 
 * Function:		Release the memory of allocated funProps;
 *
 * Parameter: 		funProps     - The allocated memory of FunProp structure.
 *
 * Return Value: 	An integer number, Zero denotes successs and Non-zero means error.
**/
int destroyFunProp(struct FunProp** funProps);

#endif