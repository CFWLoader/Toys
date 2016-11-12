#include <stdio.h>
#include <string.h>

#include "aux/ConfResolver.h"

int main(int argc, char** argv)
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