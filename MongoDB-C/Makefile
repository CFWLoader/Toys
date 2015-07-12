CC = g++

TARGET_FILES = RunMongo1

CXX_FLAGS = -std=c++11 -Wall -g

MONGO_FLAGS = `pkg-config --cflags --libs libmongoc-1.0`

JSON_FLAGS = -ljsoncpp

all: $(TARGET_FILES)

RunMongo1: RunMongo.o MongoConnection.o
	$(CC) -o RunMongo1 $^ $(CXX_FLAGS) $(MONGO_FLAGS)

RunMongo.o: RunMongo.cpp
	$(CC) -o $@ $< -c $(CXX_FLAGS) $(MONGO_FLAGS)

MongoConnection.o: MongoConnection.cpp MongoConnection.h
	$(CC) -o $@ $< -c $(CXX_FLAGS) $(MONGO_FLAGS)

clean:
	rm -rf *.o

cleanall:
	rm -rf *.o $(TARGET_FILES)