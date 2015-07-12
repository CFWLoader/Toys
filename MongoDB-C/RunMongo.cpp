#include "MongoConnection.h"

#include <iostream>
#include <string>

using namespace std;

int main(int argc, char* argv[])
{
	clown::MongoConnection mongo("evan", "123456", "test", "test");
	
	/*
	std::vector<pair<string, string>> v;

	v.push_back(make_pair("name", "zhangsan"));

	vector<string>* jsonObjects = mongo.find(v);

	auto objectIterator = jsonObjects->begin(), objectEnd = jsonObjects->end();

	while(objectIterator != objectEnd)
	{
		cout << *objectIterator << endl;

		++objectIterator;
	}
	*/

	std::vector<pair<string,string>> properties;

	properties.push_back(make_pair("brand", "AMD"));
	properties.push_back(make_pair("Memory", "48bit"));

	mongo.update("55a26630fc40ba8f1bf45739", properties);

	//delete jsonObjects;

	return 0;
}