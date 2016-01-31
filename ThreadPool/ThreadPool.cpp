//
// Created by cfwloader on 12/31/15.
//

#include "ThreadPool.h"

std::function<void()> ThreadPool::getNextTask()
{
    MutexLockGuard guard(lock);                     // Critical field.

    std::function<void()> task = taskQueue.front();

    taskQueue.pop_front();

    return task;
}
