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