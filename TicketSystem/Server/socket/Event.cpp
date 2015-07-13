#include "Event.h"
#include "ClownThread.h"

#include "../database/MongoConnection.h"

#include <functional>
#include <vector>
#include <utility>
#include <string>
#include <iostream>

#include <unistd.h>
#include <cassert>

#include <json/json.h>

clown::Event::Event(int socketFD, const HandleClose& callBack) :
	clientFD(socketFD),
	closeCallBack(callBack),
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

		closeCallBack();
	}
	else if(nRead == 0)
	{
		closeCallBack();
	}
	else
	{
		std::string strBuffer(buffer);

		if(this->saveData(strBuffer))
		{
			echoMessage.append("Error.\n");
		}
		else
		{
			echoMessage.append("Succeeded.\n");
		}

        write(clientFD, echoMessage.c_str(), echoMessage.size());

        echoMessage.clear();
	}

	delete this;
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
	Json::Reader reader;
	Json::Value root;

	if(!reader.parse(jsonObject, root))return -1;

	std::vector<std::pair<std::string, std::string>> objectProperties;

	objectProperties.push_back(std::make_pair("origin", root["origin"].asString()));
	objectProperties.push_back(std::make_pair("destination", root["destination"].asString()));
	objectProperties.push_back(std::make_pair("price", root["price"].asString()));
	objectProperties.push_back(std::make_pair("paid", root["paid"].asString()));
	objectProperties.push_back(std::make_pair("charge", root["charge"].asString()));

	connection->insert(objectProperties);

	return 0;
}