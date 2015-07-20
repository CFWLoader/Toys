#include "ClientSocket.h"

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstring>

#include <string>

/*************************************************
Function:       ClientSocket
Description:    Constructor of class ClientSocket
Calls:          socket()
				htons()
				inet_pton()
				connect()
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
ClientSocket::ClientSocket()
{
    socketFileDescriptor = ::socket(AF_INET, SOCK_STREAM, 0);

    ::bzero(&serverAddress, sizeof(serverAddress));

    serverAddress.sin_family = AF_INET;
    serverAddress.sin_port = htons(4433);
    inet_pton(AF_INET, "127.0.0.1", &serverAddress.sin_addr);

    ::connect(socketFileDescriptor, (sockaddr*) &serverAddress, sizeof(serverAddress));
}

/*************************************************
Function:       ~ClientSocket
Description:    Destrcutor of class ClientSocket.
Calls:          close()
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
ClientSocket::~ClientSocket()
{
    ::close(socketFileDescriptor);
}

/*************************************************
Function:       sendString
Description:    Send a string in json form to the TcpServer.
Calls:          const std::string& message: Json form string.
Input:          None.
Output:         None.
Return:         An integer indicating the result of insertion.
                0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int ClientSocket::sendString(const std::string& message)
{
    return ::write(socketFileDescriptor, message.c_str(), message.size());
}
