#include "ServerViaPoll.h"
#include "ServerViaPoll.cpp"
#include <iostream>

using namespace std;

int main(int argc, char* argv[])
{
    int					sockfd;
    struct sockaddr_in	servaddr;

    FILE* fp = fopen("/run/media/cfwloader/Documents/Project/LittleProjects/MultiplexIO/TestFile.txt", "r");

    if(fp == NULL){
        fprintf(stderr, "Open test script failed.");
        exit(-4);
    }

    if (argc != 2){
        fprintf(stderr, "usage: tcpcli <IPaddress>");
        return -3;
    }

    sockfd = socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERVER_PORT);
    inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    connect(sockfd, (sockaddr*) &servaddr, sizeof(servaddr));

    //stringClient(stdin, sockfd);		/* do it all */
    stringClient(fp, sockfd);

    fclose(fp);

    exit(0);
}