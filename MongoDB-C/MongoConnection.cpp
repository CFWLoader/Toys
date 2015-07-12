#include "MongoConnection.h"

#include <string>
#include <iostream>

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

std::vector<std::string>* MongoConnection::find(const std::vector<std::pair<std::string, std::string>>& queryConstriants)
{
    mongoc_cursor_t *cursor;
	const bson_t *doc;
    bson_t *query;

    char* str;

    std::vector<std::string>* result = new std::vector<std::string>();

    query = ::bson_new();

    auto queryIterator = queryConstriants.begin(), queryEnd = queryConstriants.end();

    while(queryIterator != queryEnd)
    {
    	::BSON_APPEND_UTF8 (query, (queryIterator->first).c_str(), (queryIterator->second).c_str());

    	++queryIterator;
    }

    cursor = ::mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, nullptr, nullptr);

    while (::mongoc_cursor_next (cursor, &doc)) 
    {
        str = ::bson_as_json(doc, nullptr);

        result->push_back(std::string(str));

        //printf("%s\n", str);
        ::bson_free (str);
    }

    ::bson_destroy(query);
    ::mongoc_cursor_destroy(cursor);

	return result;
}

int MongoConnection::insert(const std::vector<std::pair<std::string, std::string>>& objectProperties)
{
    bson_error_t error;
    bson_oid_t oid;
    bson_t *doc;

    doc = bson_new ();
    ::bson_oid_init(&oid, nullptr);
    ::BSON_APPEND_OID(doc, "_id", &oid);

    auto propertiesIterator = objectProperties.begin(), propertiesEnd = objectProperties.end();

    while(propertiesIterator != propertiesEnd)
    {
    	::BSON_APPEND_UTF8 (doc, propertiesIterator->first.c_str(), propertiesIterator->second.c_str());

    	++propertiesIterator;
    }

    if (!::mongoc_collection_insert(collection, MONGOC_INSERT_NONE, doc, nullptr, &error)) 
    {
    	std::cerr << error.message << std::endl;

        return -1;
    }

    ::bson_destroy (doc);

    return 0;
}

int MongoConnection::remove(const std::string& objectId)
{
	bson_oid_t oid;

	bson_error_t error;
    bson_t *doc;

	::bson_oid_init_from_string(&oid, objectId.c_str());

    doc = ::bson_new();
    BSON_APPEND_OID (doc, "_id", &oid);

    if (!::mongoc_collection_remove(collection, MONGOC_REMOVE_SINGLE_REMOVE, doc, NULL, &error))
    {
        std::cerr << error.message << std::endl;

        return -1;
    }

    bson_destroy (doc);

    return 0;
}

int MongoConnection::update(const std::string& objectId, const std::vector<std::pair<std::string, std::string>>& objectProperties)
{
    bson_error_t error;
    bson_oid_t oid;
    //bson_t *doc = NULL;
    bson_t *update = NULL;
    bson_t *query = NULL;

	::bson_oid_init_from_string(&oid, objectId.c_str());

    query = BCON_NEW ("_id", BCON_OID (&oid));

	update = ::bson_new();

    auto propertiesIterator = objectProperties.begin(), propertiesEnd = objectProperties.end();

    while(propertiesIterator != propertiesEnd)
    {
    	::BSON_APPEND_UTF8 (update, propertiesIterator->first.c_str(), propertiesIterator->second.c_str());

    	++propertiesIterator;
    }

    if (!mongoc_collection_update (collection, MONGOC_UPDATE_NONE, query, update, NULL, &error))
    {
        std::cerr << error.message << std::endl;

        return -1;
    }

    //if (doc)bson_destroy (doc);
    if (query)bson_destroy (query);
    if (update)bson_destroy (update);

    return 0;
}