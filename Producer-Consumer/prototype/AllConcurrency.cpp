//
// Created by cfwloader on 5/24/15.
// Version 0.1
//

/**
 * This version, all threads start together.
 * The consumer will randomly access the items.
 */

#include <iostream>
#include <pthread.h>

#define MAXNITEMS       1000000
#define MAXNTHREADS         100

int nitems;                                     /* read-only by producer and consumer */

struct {
    pthread_mutex_t mutex;
    int             buffer[MAXNITEMS];
    int             nput;
    int             nval;
} shared = {
        .mutex = PTHREAD_MUTEX_INITIALIZER
};

void* produce(void*);
void* consume(void*);
void consumeWait(int);

using namespace std;

int main(int argc, char* argv[])
{

    int i, nthreads, count[MAXNTHREADS];

    pthread_t producers[MAXNTHREADS], consumer;

    nitems = min(atoi(argv[1]), MAXNITEMS);

    nthreads = min(atoi(argv[2]), MAXNTHREADS);

    /* Specified for solaris.*/
    //set_concurrency(nthreads);

    /* start all threads.*/
    for(i = 0; i < nthreads; ++i){
        count[i] = 0;
        pthread_create(&producers[i], NULL, produce, &count[i]);
    }

    pthread_create(&consumer, NULL, consume, NULL);

    /* wait for all the producer threads.*/
    for(i = 0; i < nthreads; ++i){
        pthread_join(producers[i], NULL);
        cout << "count[" << i << "] = " << count[i] << endl;
    }

    /* start, then wait for the  consumer thread.*/
    pthread_join(consumer, NULL);

    return 0;
}

void* produce(void* args)
{
    for(;;)
    {
        pthread_mutex_lock(&shared.mutex);
        if( shared.nput >= nitems){
            pthread_mutex_unlock(&shared.mutex);
            return NULL;
        }

        shared.buffer[shared.nput] = shared.nval;

        ++shared.nput;
        ++shared.nval;

        pthread_mutex_unlock(&shared.mutex);

        *((int*)args) += 1;
    }
}

void* consume(void* args){

    int i;

    for(i = 0; i < nitems; ++i){

        consumeWait(i);

        //If synchronization failed, we output it.
        //Actually, we won't see this output via mutex.
        if(shared.buffer[i] != i){
            printf("buffer[%d] = %d.\n", i, shared.buffer[i]);
        }
    }

    return 0;
}

void consumeWait(int i){
    for(;;){
        pthread_mutex_lock(&shared.mutex);

        if(i < shared.nput){

            pthread_mutex_unlock(&shared.mutex);

            return;
        }

        pthread_mutex_unlock(&shared.mutex);
    }
}