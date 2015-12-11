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

        int putConfiguration(const std::string&, const std::string&);

        std::string getConfiguration(const std::string&) const;

        int putProperty(const std::string&, std::shared_ptr<XMLObject*>);

        XMLObject* getProperty(const std::string&) const;

        // Extracting basic data type value functions.

        bool getBool(const std::string&) const;

        std::vector<bool> getBoolArray(const std::string&) const;

        short getShort(const std::string&) const;

        std::vector<short> getShortArray(const std::string&) const;

        unsigned short getUnsignedShort(const std::string&) const;

        std::vector<unsigned short> getUnsignedShortArray(const std::string&) const;

        int getInt(const std::string&) const;

        std::vector<int> getIntArray(const std::string&) const;

        unsigned int getUnsignedInt(const std::string&) const;

        std::vector<unsigned int> getUnsignedIntArray(const std::string&) const;

        char getChar(const std::string&) const;

        std::vector<char> getCharArray(const std::string&) const;

        long getLong(const std::string&) const;

        std::vector<long> getLongArray(const std::string&) const;

        unsigned long getUnsignedLong(const std::string&) const;

        std::vector<unsigned long> getUnsignedLongArray(const std::string&) const;

        float getFloat(const std::string&) const;

        std::vector<float> getFloatArray(const std::string&) const;

        double getDouble(const std::string&) const;

        std::vector<double> getDoubleArray(const std::string&) const;

        long double getLongDouble(const std::string&) const;                            // C++ 11 specified.

        std::vector<long double> getLongDoubleArray(const std::string&) const;

        std::string getString(const std::string&) const;

        std::vector<std::string> getStringArray(const std::string&) const;

    private:

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
