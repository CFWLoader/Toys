//
// Created by cfwloader on 12/11/15.
//

#ifndef XMLPARSER_XMLPARSER_H
#define XMLPARSER_XMLPARSER_H

#include <map>
#include <vector>
#include <memory>

namespace XMLUtilities
{

    // enum class PropertyType{SINGLE, ARRAY};

    class XMLObject
    {
    public:

        XMLObject(const std::string& = "", const std::string& = "");

        int setName(const std::string&);

        const std::string& getName() const;

        int setRawValue(const std::string&);

        int putConfiguration(const std::string&, const std::string&);

        std::string getConfiguration(const std::string&) const;

        int putProperty(const std::string&, std::shared_ptr<XMLObject*>);

        XMLObject* getProperty(const std::string&) const;

        // Extracting basic data type value functions.

        bool extractBool() const;

        short extractShort() const;

        unsigned short extractUnsignedShort() const;

        int extractInt() const;

        unsigned int extractUnsignedInt() const;

        char extractChar() const;

        long extractLong() const;

        unsigned long extractUnsignedLong() const;

        float extractFloat() const;

        double extractDouble() const;

        // long double extractLongDouble() const;                            // C++ 11 specified.

        std::string extractString() const;

    private:

        std::string name;

        std::string value;

        std::map<std::string, std::string> configurations;      // Store the configuration in the tags.

        std::map<std::string, std::shared_ptr<XMLObject*>> properties;           // Store the properties specified in XML objects.

    };

    class XMLParser
    {
    public:

    private:

    };
}


#endif //XMLPARSER_XMLPARSER_H
