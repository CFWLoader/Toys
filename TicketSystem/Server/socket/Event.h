#ifndef CLOWNEVENT_H_
#define CLOWNEVENT_H_

#include "TcpServer.h"

namespace clown
{
	class MongoConnection;

	class Event{
	public:

		explicit Event(int, TcpServer*);

		~Event();

		void serveFunction();

		int happen();

		int saveData(const char*);

		inline bool isFinished() const;

	private:

		int clientFD;

		bool finishedFlag;

		TcpServer* serverPointer;

		MongoConnection* connection;
	};
}

inline bool clown::Event::isFinished() const
{
	return finishedFlag;
}

#endif