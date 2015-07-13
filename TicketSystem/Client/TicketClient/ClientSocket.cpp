#include "ClientSocket.h"

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstring>

#include <string>

ClientSocket::ClientSocket()
{
    socketFileDescriptor = ::socket(AF_INET, SOCK_STREAM, 0);

    ::bzero(&serverAddress, sizeof(serverAddress));

    serverAddress.sin_family = AF_INET;
    serverAddress.sin_port = htons(4433);
    inet_pton(AF_INET, "127.0.0.1", &serverAddress.sin_addr);

    ::connect(socketFileDescriptor, (sockaddr*) &serverAddress, sizeof(serverAddress));
}

ClientSocket::~ClientSocket()
{
    ::close(socketFileDescriptor);
}

int ClientSocket::sendString(const std::string& message)
{
    return ::write(socketFileDescriptor, message.c_str(), message.size());
}
