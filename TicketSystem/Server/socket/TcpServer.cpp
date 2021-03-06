#include "TcpServer.h"
#include "Event.h"

//POSIX
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/epoll.h>
#include <fcntl.h>

//C Standard
#include <cstdio>
#include <unistd.h>
#include <cerrno>
#include <cstring>

//C++
#include <vector>
#include <string>
#include <iostream>

/* Define the server port. */
unsigned short SERVER_PORT = 4433;

/* Limit the socket file descriptor connecting to server. */
size_t MAX_LISTEN_QUEUE = 128;

/* Limit the number of client registered in server. */
size_t MAX_CLIENT_NUMBER = 256;

/*************************************************
Function:       TcpServer
Description:    Default Constrctor of class TcpServer.
Calls:          None.
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
clown::TcpServer::TcpServer() : socketFileDescriptor(-1)
{
	bzero(&serverAddress, sizeof(serverAddress));
}

/*************************************************
Function:       TcpServer
Description:    Default destrctor of class TcpServer.
Calls:          None.
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
clown::TcpServer::~TcpServer()
{
	close(socketFileDescriptor);
}

/*************************************************
Function:       initialize
Description:    Initalizee the class TcpServer's member for preparing an application server.
Calls:          socket()
				htonl()
				htons()
				bind()
				fprint()
				perror()
				close()
				listen()
Input:          None.
Output:         None.
Return:         An integer indicating the result of initialization.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::TcpServer::initialize()
{
	socklen_t socketLength = sizeof(sockaddr);

	socketFileDescriptor = socket(AF_INET, SOCK_STREAM, 0);

	if(socketFileDescriptor == -1)
	{
		fprintf(stderr, "Error: socket()\n");

		perror("Detail: ");

		return -1;
	}

	serverAddress.sin_family = AF_INET;
	serverAddress.sin_addr.s_addr = htonl(INADDR_ANY);
	serverAddress.sin_port = htons(SERVER_PORT);

	int result = ::bind(socketFileDescriptor, (sockaddr*)&serverAddress, socketLength);

	if(result == -1)
	{
		fprintf(stderr, "Error: bind()\n");

		perror("Detail: ");

		close(socketFileDescriptor);

		return -2;
	}

	result = listen(socketFileDescriptor, MAX_LISTEN_QUEUE);

	if(result == -1)
	{
		fprintf(stderr, "Error: listen()\n");

		perror("Detail: ");

		close(socketFileDescriptor);

		return -2;
	}

	return 0;
}

/*************************************************
Function:       serve
Description:    Start the server to serve the incoming request.
				A new request will be dispatched a new thread to serve it.
Calls:          epoll_create()
				fprintf()
				perror()
				epoll_ctl()
				epoll_wait()
				close()
				accept()
				clown::TcpServer::setNonBlocking()
				std::bind()
				clown::Event::happen()
Input:          None.
Output:         None.
Return:         An integer indicating the result of initialization.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::TcpServer::serve()
{
	int connectFD, epollFD;								//File Descriptors.

	int result, nReady, i;

	std::string echoMessage;

	sockaddr_in clientAddress;

	socklen_t clientLength = sizeof(sockaddr);

	epollFD = epoll_create(MAX_CLIENT_NUMBER);

	if(epollFD == -1)
	{
		fprintf(stderr, "Error: epoll_create()\n");

		perror("Details: ");

		return -1;
	}

	epoll_event settingEvent;

	std::vector<epoll_event> clientEvents(MAX_CLIENT_NUMBER);

	settingEvent.events = EPOLLIN;

	settingEvent.data.fd = socketFileDescriptor;

	result = epoll_ctl(epollFD, EPOLL_CTL_ADD, socketFileDescriptor, &settingEvent);

	if(result == -1)
	{
		fprintf(stderr, "Error: epoll_ctl()\n");

		perror("Details: ");

		close(epollFD);

		return -2;
	}

	while(true)
	{
		nReady = epoll_wait(epollFD, clientEvents.data(), MAX_CLIENT_NUMBER, -1);

		if(nReady == -1)
		{
			fprintf(stderr, "Error: epoll_wait()\n");

			perror("Details: ");

			close(epollFD);

			return -3;
		}

		for(i = 0; i < nReady; ++i)
		{
			if(clientEvents[i].data.fd == socketFileDescriptor)
			{
				connectFD = accept(socketFileDescriptor, (sockaddr*)(&clientAddress), &clientLength);

				if(connectFD == -1)
				{
					perror("A failed client connection, ignored.\n");

					continue;
				}

				this->setNonBlocking(connectFD);

				settingEvent.events = EPOLLIN | EPOLLET;
				settingEvent.data.fd = connectFD;

				result = epoll_ctl(epollFD, EPOLL_CTL_ADD, connectFD, &settingEvent);

				if(result == -1)
				{
					fprintf(stderr, "Error: epoll_ctl() for client, ignored.\n");

					perror("Details: ");

					continue;
				}

			}
			else
			{
				clown::Event* clientEventThread = new clown::Event(clientEvents[i].data.fd, 
					std::bind(&TcpServer::closeClientFD, this, static_cast<int>(clientEvents[i].data.fd)));

				clientEventThread->happen();
			}
		}
	}

	return 0;
}

/*************************************************
Function:       setNonBlocking
Description:    Setting the file descriptor non-blocking IO to improve the performance of TpcServer.
Calls:          fcntl()
Input:          An integer of file descriptor.
Output:         None.
Return:         An integer indicating the result of initialization.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::TcpServer::setNonBlocking(int sockfd)
{
    if (fcntl(sockfd, F_SETFL, fcntl(sockfd, F_GETFD, 0)|O_NONBLOCK) == -1) {
        return -1;
    }
    return 0;
}

/*************************************************
Function:       closeClientFD
Description:    Close the socket file descriptor via system call -- close().
Calls:          close()
Input:          An integer of file descriptor.
Output:         None.
Return:         An integer indicating the result of initialization.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::TcpServer::closeClientFD(int fd)
{
	return ::close(fd);
}

/*************************************************
Function:       echoFromThread
Description:    This is a callback function for other thread testing the tcpserver is alive.
Calls:          None.
Input:          None.
Output:         None.
Return:         void
Others:         None.
*************************************************/
void clown::TcpServer::echoFromThread()
{
	std::cout << "The function is invoked by other thread." << std::endl;
}