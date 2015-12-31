//
// Created by cfwloader on 12/31/15.
//

#include "MutexUtil.h"


MutexLock::MutexLock()
{
    pthread_mutex_init(&mutex, 0);
}

MutexLock::~MutexLock()
{
    pthread_mutex_destroy(&mutex);
}

void MutexLock::lock()
{
    pthread_mutex_lock(&mutex);
}

void MutexLock::unlock()
{
    pthread_mutex_unlock(&mutex);
}

MutexLockGuard::MutexLockGuard(MutexLock& mLock) : lock(mLock)
{
    lock.lock();
}

MutexLockGuard::~MutexLockGuard()
{
    lock.unlock();
}

pthread_mutex_t *MutexLock::getThreadMutex()
{
    return &mutex;
}
