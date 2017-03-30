project(XMLParser)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -g -Wall")

set(SOURCE_FILES parser/XMLParser.cpp main.cpp)

add_executable(xml_main ${SOURCE_FILES})