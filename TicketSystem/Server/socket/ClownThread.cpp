#include "ClownThread.h"

#include <unistd.h>
#include <cstdio>

#include <string>
#include <iostream>

namespace clown
{
	/* This struct is for transforming a Thread object to a C structure for suiting the C interface.*/
	struct ThreadData
	{
		typedef clown::Thread::ThreadFunction ThreadFunction;

		ThreadFunction threadFunction;

		explicit ThreadData(const ThreadFunction&);

		int _start();
	};
}

/*************************************************
Function:       ThreadData
Description:    Constructor of class ThreadData
Calls:          None.
Input:          const ThreadFunction&: a function will run in the new thread.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
clown::ThreadData::ThreadData(const ThreadFunction& registeringFunction) : threadFunction(registeringFunction)
{}

/*************************************************
Function:       _start
Description:    The real call that invoke the registered function in the new thread.
Calls:          threadFunction()
Input:          None.
Output:         None.
Return:         An integer indicating the result of initialization.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::ThreadData::_start()
{
	threadFunction();

	return 0;
}

/*************************************************
Function:       startThread
Description:    The outter layer of registered function for suiting itself to C interface.
Calls:          ThreadData::_start()
Input:          void*: The pointer type of the registered function.
Output:         None.
Return:         void*: pthread_create required.
Others:         None.
*************************************************/
void* clown::startThread(void* objPtr)
{
	clown::ThreadData* runningThread = static_cast<clown::ThreadData*>(objPtr);

	runningThread->_start();

	delete runningThread;

	return NULL;
}

/*************************************************
Function:       Thread
Description:    Constructor of class Thread.
Calls:          None.
Input:          const ThreadFunction&: a function will run in the new thread.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
clown::Thread::Thread(const ThreadFunction& registerFunction) : threadFunction(registerFunction)
{}

/*************************************************
Function:       start
Description:    Encapsulation of pthread_create for creating a new thread.
Calls:          pthread_create()
Input:          None.
Output:         None.
Return:         An integer indicating the result of initialization.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::Thread::start()
{
	ThreadData* runningInstance = new ThreadData(threadFunction);

	if(::pthread_create(&theThread, 0, &startThread, runningInstance))
	{
		delete runningInstance;
	}

	return 0;
}
