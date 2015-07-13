#include "ClownThread.h"

#include <unistd.h>
#include <cstdio>

#include <string>
#include <iostream>

namespace clown
{
	struct ThreadData
	{
		typedef clown::Thread::ThreadFunction ThreadFunction;

		ThreadFunction threadFunction;

		explicit ThreadData(const ThreadFunction&);

		int _start();
	};
}

clown::ThreadData::ThreadData(const ThreadFunction& registeringFunction) : threadFunction(registeringFunction)
{}

int clown::ThreadData::_start()
{
	threadFunction();

	return 0;
}

void* clown::startThread(void* objPtr)
{
	clown::ThreadData* runningThread = static_cast<clown::ThreadData*>(objPtr);

	runningThread->_start();

	delete runningThread;

	return NULL;
}

clown::Thread::Thread(const ThreadFunction& registerFunction) : threadFunction(registerFunction)
{}

int clown::Thread::start()
{
	ThreadData* runningInstance = new ThreadData(threadFunction);

	if(::pthread_create(&theThread, 0, &startThread, runningInstance))
	{
		delete runningInstance;
	}

	return 0;
}
