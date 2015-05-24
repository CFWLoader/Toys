cmake_minimum_required(VERSION 3.1)
project(Producer_Consumer)

set(LINK_OPTIONS "-lpthread")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 ${LINK_OPTIONS}")

set(SOURCE_FILES main.cpp)
add_executable(Producer_Consumer ${SOURCE_FILES})