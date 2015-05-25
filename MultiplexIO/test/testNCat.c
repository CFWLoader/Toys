#include <string.h>
#include <stdio.h>

int main(int argc, char* argv[])
{
	char arr1[50];
	char arr2[10];

	fgets(arr1, 50, stdin);

	int n = strlen(arr1);

	arr1[n - 1] = arr1[n];
	//printf("%d\n", n);

	fflush(stdin);
	fgets(arr2, 10, stdin);

	strncat(arr1, arr2, 50);

	fputs(arr1, stdout);
}
