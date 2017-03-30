//
// Created by cfwloader on 12/11/15.
//

#include "XMLParser.h"

#include <fstream>

using namespace XMLUtilities;

XMLObject::XMLObject(const std::string &sname, const std::string &svalue) :
        name(sname), value(svalue)
{ }

int XMLObject::setName(const std::string &sname)
{
    name = sname;

    return 0;
}

const std::string &XMLObject::getName() const
{
    return name;
}

int XMLObject::setRawValue(const std::string &svalue)
{
    value = svalue;

    return 0;
}

int XMLObject::putConfiguration(const std::string &cName, const std::string &cValue)
{
    configurations[cName] = cValue;

    return 0;
}

const std::string &XMLObject::getConfiguration(const std::string &cName)
{
    return configurations[cName];
}

int XMLObject::putProperty(const std::string &pName, std::shared_ptr<XMLObject> ptr)
{
    properties[pName] = ptr;

    return 0;
}

XMLObject *XMLObject::getProperty(const std::string &pName)
{
    return properties[pName].get();
}

bool XMLObject::extractBool() const
{
    return value == "true" || value == "TRUE";
}

short XMLObject::extractShort() const
{
    return (short) atoi(value.c_str());
}

unsigned short XMLObject::extractUnsignedShort() const
{
    return (unsigned short) atoi(value.c_str());
}

int XMLObject::extractInt() const
{
    return atoi(value.c_str());
}

unsigned int XMLObject::extractUnsignedInt() const
{
    return (unsigned int) atol(value.c_str());
}


char XMLObject::extractChar() const
{
    return value[0];
}

long XMLObject::extractLong() const
{
    return atol(value.c_str());
}

unsigned long XMLObject::extractUnsignedLong() const
{
    return (unsigned long) atoll(value.c_str());
}

float XMLObject::extractFloat() const
{
    return (float) atof(value.c_str());
}

double XMLObject::extractDouble() const
{
    return atof(value.c_str());
}

/*
long double XMLObject::extractLongDouble() const
{
}
 */
std::string XMLObject::extractString() const
{
    return value;
}

std::shared_ptr<XMLObject> XMLParser::parse(const std::ifstream &xmlFile)
{
    return std::shared_ptr<XMLObject>();
}

std::string XMLParser::parseRaw(std::ifstream &xmlFile)
{
    char buffer[256];

    xmlFile.getline(buffer, 256);

    return std::string(buffer);
}

std::string XMLParser::getSingleTagString(std::ifstream &src)
{
    if(src.eof())
    {
        return "";
    }

    char ch;

    src >> ch;

    while (ch != '<')
    {
        src >> ch;
    }

    src >> ch;

    std::string tagString;

    if (ch == '/')
    {
        src >> ch;
    }

    while (ch != '>' && ch != '/')
    {
        tagString.push_back(ch);

        src >> ch;
    }

    if(ch == '/')
    {
        src >> ch;
    }

    return tagString;
}
