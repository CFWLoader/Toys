#ifndef MONGOCONNECTION_H_
#define MONGOCONNECTION_H_

#include <iosfwd>

#include <bson.h>
#include <mongoc.h>

namespace clown
{
	class MongoConnection
	{
	public:
		explicit MongoConnection(const std::string&, const std::string&, const std::string&, const std::string&);

		~MongoConnection();

		int executeQuery();

	private:
		mongoc_client_t* client;
		mongoc_collection_t* collection;
	};
}

#endif