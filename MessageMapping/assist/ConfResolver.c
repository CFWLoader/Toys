#include "ConfResolver.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

static const char* KEY_WORD_TABLE[] = {"Key", "FunName", "LibPath", "FunEntry"};

static const int KEY_WORD_TABLE_SIZE = 4;

struct FunProp* readSingleFunProp(FILE* confFile);

int getKeyWordCode(char* buffer, int maxSize);

char* findStringTail(char* buffer, int maxSize);

struct FunProp* getInitializedFunProp()
{
	struct FunProp* fp = (struct FunProp*)malloc(sizeof(struct FunProp));

	assert(fp != NULL);

	fp->key = NULL;
	fp->funName = NULL;
	fp->libPath = NULL;
	fp->funEntry = NULL;

	fp->next = NULL;

	return fp;
}

int readConfFile(char* confFilePath, struct FunProp** funProps)
{
	if(confFilePath == NULL)
	{
		return -1;
	}

	FILE* confFile = fopen(confFilePath, "r");

	if(confFile == NULL)
	{
		return -2;
	}

	struct FunProp* ptr = readSingleFunProp(confFile);

	if(ptr != NULL)
	{
		*funProps = ptr;
	}

	struct FunProp* pre = ptr;

	while((ptr = readSingleFunProp(confFile)) != NULL)
	{
		pre->next = ptr;

		pre = pre->next;
	}

	//readSingleFunProp(confFile);

	fclose(confFile);

	return 0;
}

int destroyFunProp(struct FunProp** funProps)
{
	if(*funProps == NULL)
	{
		return 0;
	}

	struct FunProp* ptr = *funProps;

	struct FunProp* next;

	while(ptr != NULL)
	{
		next = ptr->next;

		if(ptr->key != NULL)
		{
			free(ptr->key);
		}

		if(ptr->funName != NULL)
		{
			free(ptr->funName);
		}

		if(ptr->libPath != NULL)
		{
			free(ptr->libPath);
		}

		if(ptr->funEntry != NULL)
		{
			free(ptr->funEntry);
		}

		free(ptr);

		ptr = next;
	}

	*funProps = NULL;

	return 0;
}


struct FunProp* readSingleFunProp(FILE* confFile)
{
	char lineBuffer[2048];

	memset(lineBuffer, ' ', 2048);

	char* chPtr = NULL;

	char singleChar= getc(confFile);

	while(singleChar != EOF && singleChar != '{')
	{
		singleChar = getc(confFile);
	}

	if(singleChar == EOF)
	{
		return NULL;
	}

	int closed = 0;

	int keyWordCode = -1;

	struct FunProp* target = getInitializedFunProp();

	while(!closed && !feof(confFile))
	{
		fgets(lineBuffer, 2048, confFile);

		//printf("%s\n", lineBuffer);

		keyWordCode = getKeyWordCode(lineBuffer, 2048);

		chPtr = strchr(lineBuffer, ':');

		if(keyWordCode > -1 && chPtr != NULL)
		{
			char* tail = findStringTail(chPtr + 1, &lineBuffer[2047] - chPtr);

			if(tail == NULL)
			{
				printf("Configuration Failed.\n");

				free(target);

				return NULL;
			}

			int strSize = tail - chPtr;

			char* targetProperty = (char*)malloc(strSize * sizeof(char));

			strncpy(targetProperty, chPtr + 1, strSize);

			targetProperty[strSize - 1] = '\0';

			switch(keyWordCode)
			{
				case 0: target->key = targetProperty;break;
				case 1: target->funName = targetProperty;break;
				case 2: target->libPath = targetProperty;break;
				case 3: target->funEntry = targetProperty;break;
				default: break;
			}
		}

		chPtr = strchr(lineBuffer, '}');

		if(chPtr != NULL && *chPtr == '}')
		{
			closed = 1;
		}
	}

	return target;

}

int getKeyWordCode(char* buffer, int maxSize)	
{
	int index = 0;

	while(index < maxSize && (buffer[index] == ' ' || buffer[index] == '\t'))
	{
		++index;
	}

	if(index == maxSize)
	{
		return -1;
	}

	char* startPos = &buffer[index];

	// printf("Start with: %s", startPos);

	while(index < maxSize && buffer[index] != ':')
	{
		++index;
	}

	int len = &buffer[index] - startPos;

	//printf("Len: %d\n", len);

	for(int i = 0; i < KEY_WORD_TABLE_SIZE; ++i)
	{
		if(strncmp(KEY_WORD_TABLE[i], startPos, len) == 0)
		{
			return i;
		}
	}

	return -1;
}

char* findStringTail(char* buffer, int maxSize)
{
	//printf("Buffer: %s\n", buffer);
	for(int i = 0; i < maxSize; ++i)
	{
		if(buffer[i] == ';')
		{
			return &buffer[i];
		}
	}

	return NULL;
}