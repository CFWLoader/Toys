#include "Event.h"
#include "ClownThread.h"

#include "../database/MongoConnection.h"

#include <functional>
#include <iostream>
#include <string>

#include <unistd.h>
#include <cassert>

#include <json/json.h>

clown::Event::Event(int socketFD, TcpServer* serverPtr) :
	clientFD(socketFD),
	serverPointer(serverPtr),
	connection(new MongoConnection("evan", "123456", "clown", "tickets"))
{}

clown::Event::~Event()
{
	delete connection;

	connection = nullptr;
}

void clown::Event::serveFunction()
{
	char buffer[MAX_LINE];

	std::string echoMessage;

	int nRead = read(clientFD, buffer, MAX_LINE);

	if(nRead < 0)
	{
		fprintf(stderr, "A client happened exception, close this connection.\n");

		perror("Details: ");

		serverPointer->closeClientFD(clientFD);
	}
	else if(nRead == 0)
	{
		serverPointer->closeClientFD(clientFD);
	}
	else
	{
		//buffer[nRead] = '\0';

		/*
		Json::Reader reader;
		Json::Value root;

		if(!reader.parse(buffer, root))return;

		std::string por = root["obj"].asString();
		*/

		std::cout << buffer << std::endl;

		//this->saveData(std::string(buffer));

        //write(clientFD, echoMessage.c_str(), echoMessage.size());

        //echoMessage.clear();
	}
}

int clown::Event::happen()
{
	clown::Thread::ThreadFunction registerFunction = std::bind(
		&clown::Event::serveFunction, this);

	clown::Thread eventThread(registerFunction);

	eventThread.start();

	finishedFlag = true;

	return 0;
}

int clown::Event::saveData(const std::string& jsonObject)
{
	std::cout << "In saveData:" << std::endl;

	Json::Reader reader;
	Json::Value root;

	if(!reader.parse(jsonObject, root))return -1;

	std::string por = root["obj"].asString();

	std::cout << jsonObject << std::endl;

	return 0;
}