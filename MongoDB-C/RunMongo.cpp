#include "MongoConnection.h"

#include <iostream>
#include <string>

using namespace std;

int main(int argc, char* argv[])
{
	clown::MongoConnection mongo("evan", "123456", "clown", "testCollection");

	return 0;
}