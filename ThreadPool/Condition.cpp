//
// Created by cfwloader on 12/31/15.
//

#include <pthread.h>
#include "Condition.h"
#include "MutexUtil.h"

Condition::Condition(MutexLock &lock) : lock_(lock)
{
    pthread_cond_init(&condition_, nullptr);
}

Condition::~Condition()
{
    pthread_cond_destroy(&condition_);
}

void Condition::notify()
{
    pthread_cond_signal(&condition_);
}

void Condition::notifyAll()
{
    pthread_cond_broadcast(&condition_);
}

void Condition::wait()
{
    pthread_cond_wait(&condition_, lock_.getThreadMutex());
}
