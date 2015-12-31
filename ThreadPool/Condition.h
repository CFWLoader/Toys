//
// Created by cfwloader on 12/31/15.
//

#ifndef THREADPOOL_CONDITION_H
#define THREADPOOL_CONDITION_H

class MutexLock;

class Condition
{
public:

    Condition(MutexLock&);

    ~Condition();

    void notify();

    void notifyAll();

    void wait();

private:

    MutexLock& lock_;

    pthread_cond_t condition_;

};


#endif //THREADPOOL_CONDITION_H
