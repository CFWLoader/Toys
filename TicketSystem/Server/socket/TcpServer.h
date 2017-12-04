/*************************************************
Copyright:      clown
Author:         Evan
Date:           2015-07-20
Description:    Encapsulate the interface of linux socket and implement a server class.
**************************************************/
#ifndef TCPSERVER_H_
#define TCPSERVER_H_

#include <netinet/in.h>
#include <arpa/inet.h>

#include <functional>

#define MAX_LINE 2048

extern unsigned short SERVER_PORT;

extern size_t MAX_LISTEN_QUEUE;

extern size_t MAX_CLIENT_NUMBER;

namespace clown
{
	class TcpServer
	{
	public:
		//typedef std::function<int()> CallBackOfServerCloseFD;
		typedef std::function<int()> CallBackOfServerCloseFD;

		TcpServer();

		int initialize();

		int serve();

		int setNonBlocking(int);

		int closeClientFD(int);

		void echoFromThread();

		~TcpServer();

	private:
		int socketFileDescriptor;

		sockaddr_in serverAddress;
	};
}

#endif