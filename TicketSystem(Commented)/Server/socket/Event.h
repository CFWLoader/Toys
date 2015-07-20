/*************************************************
Copyright:      clown
Author:         Evan
Date:           2015-07-20
Description:    Abstract the the request to an event for promote the reuse of the TcpServer.
**************************************************/
#ifndef CLOWNEVENT_H_
#define CLOWNEVENT_H_

#include "TcpServer.h"

#include <iosfwd>

namespace clown
{
	class MongoConnection;

	class Event{
	public:
		typedef TcpServer::CallBackOfServerCloseFD HandleClose;

		explicit Event(int, const HandleClose&);

		~Event();

		void serveFunction();

		int happen();

		int saveData(const std::string&);

		inline bool isFinished() const;

	private:

		int clientFD;

		HandleClose closeCallBack;

		bool finishedFlag;

		MongoConnection* connection;
	};
}

inline bool clown::Event::isFinished() const
{
	return finishedFlag;
}

#endif