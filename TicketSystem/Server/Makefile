CC = g++

TARGET_FILES = runServer

CXX_FLAGS = -std=c++11 -Wall -g

MONGO_FLAGS = `pkg-config --cflags --libs libmongoc-1.0`

JSON_FLAGS = -ljsoncpp

OBJECT_FILE_DIR = ./objects

DATABASE_COM_DIR = ./database

SERVER_COM_DIR = ./socket

all: $(TARGET_FILES)

runServer: ServerTrigger.o Event.o ClownThread.o TcpServer.o MongoConnection.o
	@($(CC) -o $(OBJECT_FILE_DIR)/$@ $(OBJECT_FILE_DIR)/ServerTrigger.o $(OBJECT_FILE_DIR)/Event.o \
	 $(OBJECT_FILE_DIR)/ClownThread.o $(OBJECT_FILE_DIR)/TcpServer.o $(OBJECT_FILE_DIR)/MongoConnection.o $(CXX_FLAGS) $(MONGO_FLAGS) $(JSON_FLAGS); \
	 cp $(OBJECT_FILE_DIR)/$@ ./$@;)

MongoConnection.o: $(DATABASE_COM_DIR)/MongoConnection.cpp $(DATABASE_COM_DIR)/MongoConnection.h
	@$(CC) -o $(OBJECT_FILE_DIR)/$@ $< -c $(CXX_FLAGS) $(MONGO_FLAGS)

TcpServer.o: $(SERVER_COM_DIR)/TcpServer.cpp $(SERVER_COM_DIR)/TcpServer.h
	@$(CC) -o $(OBJECT_FILE_DIR)/$@ $< -c $(CXX_FLAGS)

ClownThread.o: $(SERVER_COM_DIR)/ClownThread.cpp $(SERVER_COM_DIR)/ClownThread.h
	@$(CC) -o $(OBJECT_FILE_DIR)/$@ $< -c $(CXX_FLAGS)

Event.o: $(SERVER_COM_DIR)/Event.cpp $(SERVER_COM_DIR)/Event.h
	@$(CC) -o $(OBJECT_FILE_DIR)/$@ $< -c $(CXX_FLAGS) $(MONGO_FLAGS)

ServerTrigger.o: ServerTrigger.cpp
	@$(CC) -o $(OBJECT_FILE_DIR)/$@ $< -c $(CXX_FLAGS)

clean:
	rm -rf $(OBJECT_FILE_DIR)/*

cleanall:
	rm -rf $(OBJECT_FILE_DIR)/* $(TARGET_FILES)