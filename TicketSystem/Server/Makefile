CC = g++

TARGET_FILES = MongoConnection.o

CXX_FLAGS = -std=c++11 -Wall -g

MONGO_FLAGS = `pkg-config --cflags --libs libmongoc-1.0`

JSON_FLAGS = -ljsoncpp

OBJECT_FILE_DIR = ./objects

all: $(TARGET_FILES)

MongoConnection.o: ./database/MongoConnection.cpp ./database/MongoConnection.h
	$(CC) -o $(OBJECT_FILE_DIR)/$@ $< -c $(CXX_FLAGS) $(MONGO_FLAGS)

clean:
	rm -rf $(OBJECT_FILE_DIR)/*

cleanall:
	rm -rf $(OBJECT_FILE_DIR)/* $(TARGET_FILES)