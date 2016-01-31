//
// Created by cfwloader on 12/31/15.
//

#ifndef THREADPOOL_THREADPOOL_H
#define THREADPOOL_THREADPOOL_H

#include <vector>
#include <deque>
#include <functional>

#include "Thread.h"


class ThreadPool
{
public:
private:

    MutexLock lock;

    std::function<void()> getNextTask();

    std::vector<Thread> threads;

    std::deque<std::function<void()>> taskQueue;
};


#endif //THREADPOOL_THREADPOOL_H
