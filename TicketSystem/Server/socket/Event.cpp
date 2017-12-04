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

/*************************************************
Function:       Event
Description:    Constructor of class Event.
Calls:          None.
Input:          int socketFD: the client identifier indicates the client will be served.
				const HandleClose& callBack: a callback function be called when the client sent an error.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
clown::Event::Event(int socketFD, const HandleClose& callBack) :
	clientFD(socketFD),
	closeCallBack(callBack),
	connection(new MongoConnection("evan", "123456", "clown", "tickets"))
{}

/*************************************************
Function:       ~Event
Description:    Destructor of class Event.
Calls:          delete()
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
clown::Event::~Event()
{
	delete connection;

	connection = nullptr;
}

/*************************************************
Function:       serverFunction
Description:    The logic codes for serving the client request.
Calls:          read()
				fprintf()
				perror()
				closeCallBack()
				clown::Event::saveData()
				std::string::append()
				write()
				std::string::clear()
				std::string::c_str()
Input:          None.
Output:         None.
Return:         void
Others:         None.
*************************************************/
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

	//auto destructing after the event is finished.
	delete this;
}

/*************************************************
Function:       happen
Description:    The function of class Event that take the Event::serveFunction to new thread and start the new thread.
Calls:          std::bind()
				clown::Event::start()
Input:          None.
Output:         None.
Return:         An integer indicating the result of invocation.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
int clown::Event::happen()
{
	clown::Thread::ThreadFunction registerFunction = std::bind(
		&clown::Event::serveFunction, this);

	clown::Thread eventThread(registerFunction);

	eventThread.start();

	finishedFlag = true;

	return 0;
}

/*************************************************
Function:       saveData
Description:    A function accept the raw string date from client and transit the json form to object.
				Finally call MongoConnection to save the information.
Calls:          std::vector::push_back()
				std::make_pair()
				Json::Reader::parse()
				Json::Value::operator[]()
				Json::Value::asString()
Input:          const std::string& jsonObject: A string obeys the json form.
Output:         None.
Return:         An integer indicating the result of invocation.
				0 is success and other non-zero means failed.
Others:         None.
*************************************************/
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