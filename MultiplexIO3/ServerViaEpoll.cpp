//
// Created by cfwloader on 5/24/15.
//

#include "ServerViaEpoll.h"

inline int max(int a, int b)
{
    return (a > b) ? a : b;
}

int setnonblocking(int sockfd)
{
    if (fcntl(sockfd, F_SETFL, fcntl(sockfd, F_GETFD, 0)|O_NONBLOCK) == -1) {
        return -1;
    }
    return 0;
}

int runServer(int argc, char* argv[])
{
    /* Initializations. */
    int i, listenFileDescriptor, connectFileDescriptor, socketFileDescriptor, epollFileDescriptor;

    unsigned long maxIndex;

    int nReady;

    ssize_t n;

    char appendMessage[] = "(Echo from server)\n";
    int messageLength = strlen(appendMessage);

    FILE* serviceLog = fopen("/run/media/cfwloader/Documents/Project/LittleProjects/MultiplexIO2/ServiceLogs.txt", "w+");

    if(serviceLog == NULL){
        fprintf(stderr, "Open file failed.\n");
        abort();
    }

    //fd_set readSet, allSet;

    char buffer[MAXLINE];

    //struct pollfd client[OPEN_MAX];

    socklen_t clientLength = sizeof(sockaddr);

    struct sockaddr_in clientAddr, serverAddr;

    // Initialize server parameters.
    listenFileDescriptor = socket(AF_INET, SOCK_STREAM, 0);

    bzero(&serverAddr, sizeof(serverAddr));

    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = htonl(INADDR_ANY);
    serverAddr.sin_port = htons(SERVER_PORT);
    // Parameters set. Injecting the server parameters to system.

    bind(listenFileDescriptor, (sockaddr*) &serverAddr, sizeof(serverAddr));

    listen(listenFileDescriptor, LISTEN_QUEUE);
    // Server initialization finished.

    //Epoll models initialization.
    epoll_event listenEvents;                               /* Listen fd's events. */
    std::vector<epoll_event> events(MAX_EVENTS);                 /* Events for clients, C++ ready via container. */

    epollFileDescriptor = epoll_create(10);

    if(epollFileDescriptor == -1){
        perror("Error happened in epoll_create.");
        exit(EXIT_FAILURE);
    }

    listenEvents.events = EPOLLIN;
    listenEvents.data.fd = listenFileDescriptor;

    if(epoll_ctl(epollFileDescriptor, EPOLL_CTL_ADD, listenFileDescriptor, &listenEvents) == -1){
        perror("Error happened in epoll_ctl for listen socket.");
        exit(EXIT_FAILURE);
    }

    /* All initialization finished. Start listening events. */
    for(;;)
    {
        nReady = epoll_wait(epollFileDescriptor, events.data(), MAX_EVENTS, -1);

        if(nReady == -1){
            perror("Error happened in epoll_wait.");
            exit(EXIT_FAILURE);
        }

        for(i = 0; i < nReady; ++i){

            if(events[i].data.fd == listenFileDescriptor){

                //fprintf(stdout, "New client.");

                connectFileDescriptor = accept(listenFileDescriptor, (sockaddr*)&clientAddr, &clientLength);

                if(connectFileDescriptor == -1){
                    perror("A failed connection happened.");
                    continue;
                }

                setnonblocking(connectFileDescriptor);
                listenEvents.events = EPOLLIN | EPOLLET;
                listenEvents.data.fd = connectFileDescriptor;

                if(epoll_ctl(epollFileDescriptor, EPOLL_CTL_ADD, connectFileDescriptor, &listenEvents) == -1){
                    perror("Error happened in epoll_ctl: connecFilDescriptor.");
                    continue;
                }
            } else {

                /* Closing the descriptor will make epoll remove it from the set of descriptors which are monitored. */

                if((n = read(events[i].data.fd, buffer, MAXLINE)) < 0){
                    perror("A client socket exception happened, aborting it.");

                    close(events[i].data.fd);

                    continue;

                    /*
                    if(epoll_ctl(epollFileDescriptor, EPOLL_CTL_DEL, connectFileDescriptor, &listenEvents) == -1){
                        perror("Error happened in epoll_ctl: deleting connecFilDescriptor.");
                        continue;
                    }
                     */
                } else if(n == 0){

                    close(events[i].data.fd);

                    continue;

                    /*
                    if(epoll_ctl(epollFileDescriptor, EPOLL_CTL_DEL, connectFileDescriptor, &listenEvents) == -1){
                        perror("Error happened in epoll_ctl: deleting connecFilDescriptor.");
                        continue;
                    }
                     */
                } else {
                    /*

                    buffer[n - 1] = buffer[n];

                    strncat(buffer, appendMessage, MAXLINE);

                    n = n + messageLength + 1;

                     */
                    write(events[i].data.fd, buffer, n);
                }
            }
        }

        //fprintf(stdout, "No events.\n");
    }

    fclose(serviceLog);
}

void stringClient(FILE* fp, int socketFd){

    int maxFdp1, n;

    fd_set readSet;

    char sendLine[MAXLINE], receiveLine[MAXLINE];

    FD_ZERO(&readSet);

    for(;;){
        FD_SET(fileno(fp), &readSet);

        FD_SET(socketFd, &readSet);

        maxFdp1 = max(fileno(fp), socketFd) + 1;

        select(maxFdp1, &readSet, NULL, NULL, NULL);

        if(FD_ISSET(socketFd, &readSet)){               /* Echoed. */
            if((n = read(socketFd, receiveLine, MAXLINE)) == 0){
                fprintf(stderr, "Socket Error.");
                exit(-2);
            }

            receiveLine[n] = 0;

            fputs(receiveLine, stdout);
        }

        if(FD_ISSET(fileno(fp), &readSet)){             /* Input ready. */
            if(fgets(sendLine, MAXLINE, fp) == NULL){
                return;
            }
            write(socketFd, sendLine, strlen(sendLine));
        }

        sleep(1);
    }
}