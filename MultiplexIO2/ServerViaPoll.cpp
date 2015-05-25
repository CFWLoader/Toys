//
// Created by cfwloader on 5/24/15.
//

#include "ServerViaPoll.h"

inline int max(int a, int b)
{
    return (a > b) ? a : b;
}

int runServer(int argc, char* argv[])
{
    /* Initializations. */
    int i, listenFileDescriptor, connectFileDescriptor, socketFileDescriptor;

    unsigned long maxIndex;

    int nReady;

    ssize_t n;

    //char appendMessage[] = "(Echo from server)";

    //fd_set readSet, allSet;

    char buffer[MAXLINE];

    struct pollfd client[OPEN_MAX];

    socklen_t clientLength;

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

    client[0].fd = listenFileDescriptor;
    client[0].events = POLLIN;//POLLRDNORM;

    for(i = 0; i < OPEN_MAX; ++i)
    {
        client[i].fd = -1;                                 /* -1 means the slot is available. */
    }

    maxIndex = 0;

    fprintf(stdout, "Initialization finished.\n");

    /* All initialization finished. Start listening events. */
    for(;;)
    {
        //printf("New loop happen.");
        //nReady = select(maxFileDescriptor + 1, &readSet, NULL, NULL, NULL);
        fprintf(stdout, "New loop happen.\n");
        nReady = poll(client, maxIndex + 1, 2000);
        //fprintf(stdout, "Polled.\n");

        /* Listen socket event happened, add the new client at first.*/
        if(client[0].revents &  (POLLIN | POLLERR))
        {                                               /* New client connection. */

            fprintf(stdout, "A client accepting.\n");

            clientLength = sizeof(clientAddr);
            connectFileDescriptor = accept(listenFileDescriptor, (sockaddr*)&clientAddr, &clientLength);

            for(i = 0; i < OPEN_MAX; ++i)
            {
                if(client[i].fd < 0){
                    client[i].fd = connectFileDescriptor;  /* Save new client. */
                    break;
                }
            }

            if(i == OPEN_MAX){                        /* Too many clients. */
                fprintf(stderr, "Too many clients.");
                exit(-1);
            }

            //FD_SET(connectFileDescriptor, &allSet);     /* Add new client to the listen set. */
            client[i].events = POLLRDNORM;

            /*
            if(connectFileDescriptor > maxFileDescriptor){
                maxFileDescriptor = connectFileDescriptor;  /* Update the upper bound.
            }
            */

            if(i > maxIndex){
                maxIndex = i;                               /* Max index in client[] array. */
            }

            if(--nReady <= 0){                          /* No more events wait for being dealt.*/
                continue;
            }
        }

        /* Checking the clients event.*/
        for(i = 0; i <= maxIndex; ++i)
        {
            if((socketFileDescriptor = client[i].fd) < 0)continue;     /* Empty client.*/

            fprintf(stdout, "A socket sent a message.\n");

            if(client[i].revents & (POLLRDNORM | POLLERR))              /* Readable or Error-happened. */
            {
                if((n = read(socketFileDescriptor, buffer, MAXLINE)) < 0)  /* Connection closed by client. */
                {
                    if(errno == ECONNRESET) {
                        close(socketFileDescriptor);
                        //FD_CLR(socketFileDescriptor, &allSet);
                        client[i].fd = -1;                                 /* Mark it available. */
                    } else {
                        fprintf(stderr, "Read error.\n");
                    }
                } else if( n == 0){
                    close(socketFileDescriptor);
                    client[i].fd = -1;
                } else {
                    write(socketFileDescriptor, buffer, n);
                }

                if(--nReady <= 0){
                    break;                               /* No more events wait for being dealt.*/
                }
            }
        }

        fprintf(stdout, "No events.\n");
    }
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
    }
}