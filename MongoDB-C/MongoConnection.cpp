#include "MongoConnection.h"

#include <string>

#include <cassert>

using namespace clown;

MongoConnection::MongoConnection(const std::string& username, 
	const std::string& password, 
	const std::string& dbName, 
	const std::string& collectionName)
{
	::mongoc_init ();

	std::string url = "mongodb://";

	url.append(username);
	url.append(":");
	url.append(password);
	url.append("@192.168.0.112:27017/");

	client = ::mongoc_client_new(url.c_str());

	assert(client != nullptr);

	collection = ::mongoc_client_get_collection(client, dbName.c_str(), collectionName.c_str());

	assert(collection != nullptr);
}

MongoConnection::~MongoConnection()
{
	::mongoc_client_destroy(client);
	::mongoc_collection_destroy(collection);

	collection = nullptr;
	client = nullptr;
}