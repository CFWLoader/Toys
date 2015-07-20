#include "MongoConnection.h"

#include <string>
#include <iostream>

#include <cassert>
#include <cstdio>

using namespace clown;

/*************************************************
Function:       MongoConnection
Description:    Constructor of class MongoConnection.
Calls:          mongoc_init()
                std::string::append()
                mongoc_client_new()
                assert()
                mongoc_client_get_collection()
                std::string::c_str()
Table Accessed: collectionName
Table Updated:  collectionName
Input:          const std::string& username: username to connect the mongo db.
                const std::string& password: password to connect the mongo db.
                const std::string& dbName: database name of this application.
                const std::string& collectionName: collection name of this application.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
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

/*************************************************
Function:       ~MongoConnection
Description:    Destructor of class MongoConnection
Calls:          mongoc_client_destroy()
                mongoc_collection_destroy()
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
MongoConnection::~MongoConnection()
{
	::mongoc_client_destroy(client);
	::mongoc_collection_destroy(collection);

	collection = nullptr;
	client = nullptr;
}

/*************************************************
Function:       find
Description:    Find the object in collections via the inpus constaints.
Calls:          bson_new()
                BSON_APPEND_UTF8()
                bson_free()
                bson_destroy()
                mongoc_cursor_destroy()
Table Accessed: collectionName
Table Updated:  None.
Input:          const std::vector<std::pair<std::string, std::string>>& queryConstriants: query contraints to find the object.
Output:         None.
Return:         std::vector<std::string>*: json strings, a string is a json form object.
Others:         None.
*************************************************/
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
        
        ::bson_free (str);
    }

    ::bson_destroy(query);
    ::mongoc_cursor_destroy(cursor);

	return result;
}

/*************************************************
Function:       insert
Description:    insert the object to collections.
Calls:          bson_new()
                mongoc_collection_insert()
                bson_destroy()
Table Accessed: collectionName
Table Updated:  collectionName
Input:          const std::vector<std::pair<std::string, std::string>>& objectProperties: porperties of the object being inserted.
Output:         None.
Return:         An integer indicating the result of insertion.
                0 is success and other non-zero means failed.
Others:         None.
*************************************************/
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

/*************************************************
Function:       remove
Description:    Remove the object from collections.
Calls:          bson_new()
                bson_oid_init_from_string()
                BSON_APPEND_OID()
                mongoc_collection_remove()
                bson_destroy()
Table Accessed: collectionName
Table Updated:  collectionName
Input:          const std::string& objectId: object's ID.
Output:         None.
Return:         An integer indicating the result of remove.
                0 is success and other non-zero means failed.
Others:         None.
*************************************************/
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

/*************************************************
Function:       update
Description:    Update the object in collections.
Calls:          bson_new()
                BCON_NEW()
                bson_oid_init_from_string()
                BSON_APPEND_UTF8()
                mongoc_collection_update()
                bson_destroy()
Table Accessed: collectionName
Table Updated:  collectionName
Input:          const std::string& objectId: object's ID.
                const std::vector<std::pair<std::string, std::string>>& objectProperties: The new properties of the object.
Output:         None.
Return:         An integer indicating the result of remove.
                0 is success and other non-zero means failed.
Others:         None.
*************************************************/
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