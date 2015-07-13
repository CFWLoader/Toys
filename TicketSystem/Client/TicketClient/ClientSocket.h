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
