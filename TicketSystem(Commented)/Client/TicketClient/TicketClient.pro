#-------------------------------------------------
#
# Project created by QtCreator 2015-07-13T16:35:27
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = TicketClient
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    ClientSocket.cpp

HEADERS  += mainwindow.h \
    ClientSocket.h

FORMS    += mainwindow.ui
