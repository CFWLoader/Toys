//
// Created by cfwloader on 12/31/15.
//

#ifndef THREADPOOL_MUTEXLOCK_H
#define THREADPOOL_MUTEXLOCK_H

#include <pthread.h>


class MutexLock
{
public:

    MutexLock();

    ~MutexLock();

    void lock();

    void unlock();

    pthread_mutex_t* getThreadMutex();

private:

    pthread_mutex_t mutex;

};

class MutexLockGuard
{
public:

    MutexLockGuard(MutexLock&);

    ~MutexLockGuard();

private:

    MutexLock& lock;
};


#endif //THREADPOOL_MUTEXLOCK_H
