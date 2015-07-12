#include "MongoConnection.h"

#include <iostream>
#include <string>

using namespace std;

int main(int argc, char* argv[])
{
	clown::MongoConnection mongo("evan", "123456", "clown", "testCollection");

	std::vector<pair<string, string>> v;

	v.push_back(make_pair("name", "zhangsan"));

	mongo.find(v);

	return 0;
}