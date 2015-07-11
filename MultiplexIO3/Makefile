TARGET = client epollserver

CC = g++

CXX_FLAGS = -std=c++11 -g -Wall

INCLUDE = .

all: $(TARGET)

client: Client.cpp
	$(CC) -o $@ $(CXX_FLAGS) $<

epollserver: main.o ServerViaEpoll.o
	$(CC) -o $@ $(CXX_FLAGS) $^

main.o: main.cpp
	$(CC) -o $@ $(CXX_FLAGS) -c $<

ServerViaEpoll.o: ServerViaEpoll.cpp ServerViaEpoll.h
	$(CC) -o $@ $(CXX_FLAGS) -c $<