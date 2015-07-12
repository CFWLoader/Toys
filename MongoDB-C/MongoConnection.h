#ifndef MONGOCONNECTION_H_
#define MONGOCONNECTION_H_

#include <iosfwd>
#include <utility>
#include <vector>

#include <bson.h>
#include <mongoc.h>

namespace clown
{
	class MongoConnection
	{
	public:
		explicit MongoConnection(const std::string&, const std::string&, const std::string&, const std::string&);

		~MongoConnection();

		std::vector<std::string> find(const std::vector<std::pair<std::string, std::string>>&);

	private:
		mongoc_client_t* client;
		mongoc_collection_t* collection;
	};
}

#endif