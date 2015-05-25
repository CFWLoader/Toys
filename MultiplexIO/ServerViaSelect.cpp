//
// Created by cfwloader on 5/24/15.
//

#include "ServerViaSelect.h"

inline int max(int a, int b)
{
    return (a > b) ? a : b;
}

int runServer(int argc, char* argv[])
{
    /* Initializations. */
    int i, maxi, maxFileDescriptor, listenFileDescriptor, connectFileDescriptor, socketFileDescriptor;
    int nReady, client[FD_SETSIZE];

    ssize_t n;

    char appendMessage[] = "(Echo from server)";

    fd_set readSet, allSet;

    char buffer[MAXLINE];

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

    maxFileDescriptor = listenFileDescriptor;

    maxi = -1;

    for(i = 0; i < FD_SETSIZE; ++i)
    {
        client[i] = -1;                                 /* -1 means the slot is available. */
    }

    FD_ZERO(&allSet);

    FD_SET(listenFileDescriptor, &allSet);

    /* All initialization finished. Start listening events. */
    for(;;)
    {
        //printf("New loop happen.");

        readSet = allSet;                               /* Assignment. */

        nReady = select(maxFileDescriptor + 1, &readSet, NULL, NULL, NULL);

        /* Listen socket event happened, add the new client at first.*/
        if(FD_ISSET(listenFileDescriptor, &readSet))
        {                                               /* New client connection. */
            clientLength = sizeof(clientAddr);
            connectFileDescriptor = accept(listenFileDescriptor, (sockaddr*)&clientAddr, &clientLength);

            for(i = 0; i < FD_SETSIZE; ++i)
            {
                if(client[i] < 0){
                    client[i] = connectFileDescriptor;  /* Save new client. */
                    break;
                }
            }

            if(i == FD_SETSIZE){                        /* Too many clients. */
                fprintf(stderr, "Too many clients.");
                exit(-1);
            }

            FD_SET(connectFileDescriptor, &allSet);     /* Add new client to the listen set. */

            if(connectFileDescriptor > maxFileDescriptor){
                maxFileDescriptor = connectFileDescriptor;  /* Update the upper bound. */
            }

            if(i > maxi){
                maxi = i;                               /* Max index in client[] array. */
            }

            if(--nReady <= 0){                          /* No more events wait for being dealt.*/
                continue;
            }
        }

        /* Checking the clients event.*/
        for(i = 0; i <= maxi; ++i)
        {
            if((socketFileDescriptor = client[i]) < 0)continue;     /* Empty client.*/

            if(FD_ISSET(socketFileDescriptor, &readSet))
            {
                if((n = read(socketFileDescriptor, buffer, MAXLINE)) == 0)  /* Connection closed by client. */
                {
                    close(socketFileDescriptor);
                    FD_CLR(socketFileDescriptor, &allSet);
                    client[i] = -1;                                 /* Mark it available. */
                } else {
                    //fprintf(stdout, "%d %d %d\n", strlen(buffer), n, strlen(appendMessage));
                    //strcat(buffer, appendMessage);
                    //fprintf(stdout, "%d", buffer);
                    //n = n + strlen(appendMessage);
                    //strncat(buffer, appendMessage, n);
                    //fprintf(stdout, "%d %d %d\n", strlen(buffer), n, strlen(appendMessage));
                    write(socketFileDescriptor, buffer, n);
                }

                if(--nReady <= 0){
                    break;                               /* No more events wait for being dealt.*/
                }
            }
        }
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