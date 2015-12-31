//
// Created by cfwloader on 12/31/15.
//

#ifndef THREADPOOL_THREAD_H
#define THREADPOOL_THREAD_H

#include <functional>
#include "MutexUtil.h"

class Thread
{
public:

    typedef std::function<void()> ThreadFunction;

    Thread(const ThreadFunction&, const std::string& = std::string());

    ~Thread();

    void start();

    void join();

    bool isRunning() const;

private:

    MutexLock lock;

    bool running;

    bool joined;

    pthread_t pthreadId;

    ThreadFunction function_;

    std::string threadName;

};


#endif //THREADPOOL_THREAD_H
