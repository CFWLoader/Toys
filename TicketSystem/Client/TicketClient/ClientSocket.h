/*************************************************
Copyright:      clown
Author:         Evan
Date:           2015-07-20
Description:    Implement TCP connection to application server and send the ticket deal details.
**************************************************/
#ifndef CLIENTSOCKET_H
#define CLIENTSOCKET_H

#include <arpa/inet.h>

#include <iosfwd>

class ClientSocket
{
public:
    ClientSocket();

    ~ClientSocket();

    int sendString(const std::string&);
private:

    int socketFileDescriptor;

    sockaddr_in serverAddress;
};

#endif // CLIENTSOCKET_H
