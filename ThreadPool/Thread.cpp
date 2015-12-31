//
// Created by cfwloader on 12/31/15.
//

#include "Thread.h"

struct ThreadAgent
{
    typedef Thread::ThreadFunction ThreadFunction;

    ThreadFunction func_;

    ThreadAgent(const ThreadFunction& func) : func_(func){}

    void start()
    {
        func_();
    }

};

void* startThread(void* intermediateThread)
{
    ThreadAgent* agent = static_cast<ThreadAgent*>(intermediateThread);

    agent->start();

    delete agent;

    return nullptr;
}

Thread::Thread(const Thread::ThreadFunction &function, const std::string &tName) :
        lock(), running(false), joined(false), pthreadId(0),
        function_(function), threadName(tName)
{ }

Thread::~Thread()
{
    MutexLockGuard guard(lock);

    if (running && !joined)
    {
        pthread_detach(pthreadId);
    }
}

void Thread::start()
{

    MutexLockGuard guard(lock);

    if(running)
    {
        return;
    }

    ThreadAgent* agent = new ThreadAgent(function_);

    if(::pthread_create(&pthreadId, nullptr, startThread, agent))
    {
        delete agent;

        running = false;
    }
    else
    {
        running = true;
    }

    agent = nullptr;
}

void Thread::join()
{
    MutexLockGuard guard(lock);
    if(!joined)
    {
        pthread_join(pthreadId, nullptr);
    }
}

bool Thread::isRunning() const
{
    return running;
}
