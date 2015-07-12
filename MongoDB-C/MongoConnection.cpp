#include "MongoConnection.h"

#include <string>

#include <cassert>
#include <cstdio>

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

std::vector<std::string> MongoConnection::find(const std::vector<std::pair<std::string, std::string>>& queryConstriants)
{
    mongoc_cursor_t *cursor;
	const bson_t *doc;
    bson_t *query;

    char* str;

    std::std::vector<std::string> v;

    query = ::bson_new();

    auto queryIterator = queryConstriants.begin(), queryEnd = queryConstriants.end();

    while(queryIterator != queryEnd)
    {
    	::BSON_APPEND_UTF8 (query, (queryIterator->first).c_str(), (queryIterator->second).c_str());

    	++queryIterator;
    }

    cursor = ::mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);

    while (::mongoc_cursor_next (cursor, &doc)) {
        str = ::bson_as_json(doc, NULL);
        printf("%s\n", str);
        bson_free (str);
    }

    ::bson_destroy(query);
    ::mongoc_cursor_destroy(cursor);

	return 0;
}