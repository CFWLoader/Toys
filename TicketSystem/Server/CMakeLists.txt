project(TcpServer)

cmake_minimum_required(VERSION 2.6)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -Wall -g -lpthread -ljsoncpp -I/usr/include/libmongoc-1.0 -I/usr/include/libbson-1.0 -lssl -lcrypto -lrt -lmongoc-1.0 -lbson-1.0")

set(SOURCE_FILES
		database/MongoConnection.h
		database/MongoConnection.cpp
		socket/Event.h
		socket/Event.cpp
		socket/ClownThread.h
		socket/ClownThread.cpp
		socket/TcpServer.h
		socket/TcpServer.cpp
		ServerTrigger.cpp
	)

add_executable(runServer ${SOURCE_FILES})