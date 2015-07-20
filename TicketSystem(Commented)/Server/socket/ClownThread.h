/*************************************************
Copyright:      clown
Author:         Evan
Date:           2015-07-20
Description:    Encapsulate the POSIX-thread to a class.
**************************************************/
#ifndef CLOWNTHREAD_H_
#define CLOWNTHREAD_H_

#include <functional>

#include "TcpServer.h"

#include <pthread.h>

#define MAX_LINE 2048

namespace clown
{
	void* startThread(void*);

	class Thread{
	public:

		typedef std::function<void()> ThreadFunction;

		explicit Thread(const ThreadFunction&);

		//explicit Thread(const TcpServer::CallBackOfServerCloseFD&, int);

		//explicit Thread(int, TcpServer*);
		
		//explicit Thread(const TcpServer::CallBackOfServerCloseFD&, int, const std::function<void()>&);

		int start();

	private:

		ThreadFunction threadFunction;

		pthread_t theThread;

		//TcpServer* theServerHandler;
	};
}

/*
inline clown::TcpServer* clown::Thread::getTheServerInstance() const
{
	return theServerHandler;
}
*/

#endif