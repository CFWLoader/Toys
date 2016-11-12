#include <stdio.h>
#include <string.h>
#include <dlfcn.h>

#include "aux/ConfResolver.h"

typedef double(*FunctionType)(double, double);

int readLibAndShow();

int selectAndExecuteTheFun(struct FunProp* funProps);

int main(int argc, char** argv)
{
	char clientChoice = 'l';

	while(clientChoice != 'q')
	{
		printf("Command:\n\tl - List the main function.\n\tr - Read config file and show.\n\tq - Exit the program.\n");
		printf("Your choice: ");

		scanf("%c", &clientChoice);

		switch(clientChoice)
		{
			case 'r': readLibAndShow(); break;
			default: continue;
		}
	}

	return 0;
}

int readLibAndShow()
{
	printf("The config file path(Enter 's' to load ./conf/sample.conf):");

	char filePath[256];

	memset(filePath, 0, 256);

	scanf("%s", filePath);

	if(filePath[0] == 's')
	{
		strcpy(filePath, "./conf/sample.conf");
	}

	struct FunProp* funProp = NULL;

	int result = readConfFile(filePath, &funProp);

	if(result < 0)
	{
		printf("Load config file error.");

		return -1;
	}

	selectAndExecuteTheFun(funProp);

	destroyFunProp(&funProp);

	return 0;

}

int selectAndExecuteTheFun(struct FunProp* funProps)
{

	struct FunProp* ptr = funProps;

	while(ptr != NULL)
	{
		printf("\tKey: %s 	Function: %s.\n", ptr->key, ptr->funName);

		ptr = ptr->next;
	}

	char choice[256];

	memset(choice, 0, 256);

	printf("Your choice:\n");

	scanf("%s", choice);

	printf("Enter two numeric:\n");

	double a, b;

	scanf("%lf %lf", &a, &b);

	struct FunProp* target = NULL;

	for(ptr = funProps; ptr != NULL; ptr = ptr->next)
	{
		if(!strcmp(ptr->key, choice))
		{
			target = ptr;
			break;
		}
	}

	if(target == NULL)
	{
		printf("Invalid Option, return to the previous menu.");

		return -1;
	}

	void* handle = dlopen(target->libPath, RTLD_LAZY);

	FunctionType fun = (FunctionType)dlsym(handle, target->funEntry);

	printf("Result %lf.\n", fun(a, b));

	dlclose(handle);

	return 0;
}

int fake_main(int argc, char** argv)
{
	struct FunProp* funProp = NULL;

	int result = readConfFile("conf/sample.conf", &funProp);

	struct FunProp* ptr = funProp;

	while(ptr != NULL)
	{
		printf("Key: %s, FunName: %s, LibPath: %s, FunEntry: %s.\n",
			ptr->key,
			ptr->funName,
			ptr->libPath,
			ptr->funEntry);

		ptr = ptr->next;
	}

	destroyFunProp(&funProp);

	printf("Read Code: %d.\n", result);

	//printf("Test strcmp: %d.\n", strcmp("aaav", "aaa"));

	return 0;
}