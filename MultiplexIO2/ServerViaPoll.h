//
// Created by cfwloader on 5/24/15.
//

#ifndef MULTIPLEXIO_SERVERVIASELECT_H
#define MULTIPLEXIO_SERVERVIASELECT_H

#include <sys/types.h>
#include <poll.h>
#include <sys/select.h>
#include <unistd.h>
#include <netinet/in.h>
#include <cstring>
#include <cstdio>
#include <cstdlib>
#include <cerrno>
#include <arpa/inet.h>

const int MAXLINE = 512;

const int SERVER_PORT = 4433;

const int LISTEN_QUEUE = 128;

const int OPEN_MAX = 10240;

const int INF_TIME_OUT = -1;

inline int max(int, int);

int runServer(int argc, char* argv[]);

void stringClient(FILE* fp, int socketFd);

#endif //MULTIPLEXIO_SERVERVIASELECT_H
