/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 4.8.6
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QComboBox>
#include <QtGui/QHeaderView>
#include <QtGui/QLabel>
#include <QtGui/QMainWindow>
#include <QtGui/QMenuBar>
#include <QtGui/QPushButton>
#include <QtGui/QStatusBar>
#include <QtGui/QTextEdit>
#include <QtGui/QToolBar>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QComboBox *originBox;
    QComboBox *destinationBox;
    QLabel *label;
    QLabel *label_2;
    QPushButton *putCoinsButton;
    QLabel *hintLabel;
    QLabel *priceLabel;
    QLabel *paidLabel;
    QLabel *chargeLabel;
    QPushButton *confirmButton;
    QPushButton *cancelButton;
    QTextEdit *priceTextEdit;
    QTextEdit *hintTextEdit;
    QTextEdit *paidTextEdit;
    QTextEdit *chargeTextEdit;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->setEnabled(true);
        MainWindow->resize(712, 480);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        originBox = new QComboBox(centralWidget);
        originBox->setObjectName(QString::fromUtf8("originBox"));
        originBox->setGeometry(QRect(100, 90, 121, 29));
        destinationBox = new QComboBox(centralWidget);
        destinationBox->setObjectName(QString::fromUtf8("destinationBox"));
        destinationBox->setGeometry(QRect(400, 90, 111, 29));
        label = new QLabel(centralWidget);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(60, 40, 81, 41));
        QFont font;
        font.setPointSize(22);
        label->setFont(font);
        label_2 = new QLabel(centralWidget);
        label_2->setObjectName(QString::fromUtf8("label_2"));
        label_2->setGeometry(QRect(380, 40, 151, 31));
        label_2->setFont(font);
        putCoinsButton = new QPushButton(centralWidget);
        putCoinsButton->setObjectName(QString::fromUtf8("putCoinsButton"));
        putCoinsButton->setGeometry(QRect(560, 240, 101, 91));
        putCoinsButton->setFont(font);
        hintLabel = new QLabel(centralWidget);
        hintLabel->setObjectName(QString::fromUtf8("hintLabel"));
        hintLabel->setGeometry(QRect(60, 130, 61, 31));
        hintLabel->setFont(font);
        priceLabel = new QLabel(centralWidget);
        priceLabel->setObjectName(QString::fromUtf8("priceLabel"));
        priceLabel->setGeometry(QRect(60, 200, 71, 41));
        priceLabel->setFont(font);
        paidLabel = new QLabel(centralWidget);
        paidLabel->setObjectName(QString::fromUtf8("paidLabel"));
        paidLabel->setGeometry(QRect(220, 200, 61, 41));
        paidLabel->setFont(font);
        chargeLabel = new QLabel(centralWidget);
        chargeLabel->setObjectName(QString::fromUtf8("chargeLabel"));
        chargeLabel->setGeometry(QRect(380, 200, 101, 41));
        chargeLabel->setFont(font);
        confirmButton = new QPushButton(centralWidget);
        confirmButton->setObjectName(QString::fromUtf8("confirmButton"));
        confirmButton->setGeometry(QRect(200, 370, 97, 31));
        cancelButton = new QPushButton(centralWidget);
        cancelButton->setObjectName(QString::fromUtf8("cancelButton"));
        cancelButton->setGeometry(QRect(350, 370, 97, 31));
        priceTextEdit = new QTextEdit(centralWidget);
        priceTextEdit->setObjectName(QString::fromUtf8("priceTextEdit"));
        priceTextEdit->setEnabled(false);
        priceTextEdit->setGeometry(QRect(60, 240, 131, 81));
        QFont font1;
        font1.setPointSize(36);
        priceTextEdit->setFont(font1);
        hintTextEdit = new QTextEdit(centralWidget);
        hintTextEdit->setObjectName(QString::fromUtf8("hintTextEdit"));
        hintTextEdit->setEnabled(false);
        hintTextEdit->setGeometry(QRect(90, 160, 511, 41));
        QFont font2;
        font2.setPointSize(18);
        hintTextEdit->setFont(font2);
        hintTextEdit->setAcceptDrops(true);
        paidTextEdit = new QTextEdit(centralWidget);
        paidTextEdit->setObjectName(QString::fromUtf8("paidTextEdit"));
        paidTextEdit->setEnabled(false);
        paidTextEdit->setGeometry(QRect(220, 240, 131, 81));
        paidTextEdit->setFont(font1);
        chargeTextEdit = new QTextEdit(centralWidget);
        chargeTextEdit->setObjectName(QString::fromUtf8("chargeTextEdit"));
        chargeTextEdit->setEnabled(false);
        chargeTextEdit->setGeometry(QRect(380, 240, 131, 81));
        chargeTextEdit->setFont(font1);
        MainWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QString::fromUtf8("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 712, 27));
        MainWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(MainWindow);
        mainToolBar->setObjectName(QString::fromUtf8("mainToolBar"));
        MainWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QString::fromUtf8("statusBar"));
        MainWindow->setStatusBar(statusBar);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0, QApplication::UnicodeUTF8));
        originBox->clear();
        originBox->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "A", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "B", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "C", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "D", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "E", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "F", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "G", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "H", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "I", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "J", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "K", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "L", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "M", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "N", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "O", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "P", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "Q", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "R", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "S", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "T", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "U", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "V", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "W", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "X", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "Y", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "Z", 0, QApplication::UnicodeUTF8)
        );
        destinationBox->clear();
        destinationBox->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "A", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "B", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "C", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "D", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "E", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "F", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "G", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "H", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "I", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "J", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "K", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "L", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "M", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "N", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "O", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "P", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "Q", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "R", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "S", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "T", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "U", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "V", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "W", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "X", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "Y", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("MainWindow", "Z", 0, QApplication::UnicodeUTF8)
        );
        label->setText(QApplication::translate("MainWindow", "Origin", 0, QApplication::UnicodeUTF8));
        label_2->setText(QApplication::translate("MainWindow", "Destination", 0, QApplication::UnicodeUTF8));
        putCoinsButton->setText(QApplication::translate("MainWindow", "Put\n"
"Coins", 0, QApplication::UnicodeUTF8));
        hintLabel->setText(QApplication::translate("MainWindow", "Hint", 0, QApplication::UnicodeUTF8));
        priceLabel->setText(QApplication::translate("MainWindow", "Price", 0, QApplication::UnicodeUTF8));
        paidLabel->setText(QApplication::translate("MainWindow", "Paid", 0, QApplication::UnicodeUTF8));
        chargeLabel->setText(QApplication::translate("MainWindow", "Charge", 0, QApplication::UnicodeUTF8));
        confirmButton->setText(QApplication::translate("MainWindow", "Confirm", 0, QApplication::UnicodeUTF8));
        cancelButton->setText(QApplication::translate("MainWindow", "Cancel", 0, QApplication::UnicodeUTF8));
        priceTextEdit->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Cantarell'; font-size:36pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">0.0</p></body></html>", 0, QApplication::UnicodeUTF8));
        hintTextEdit->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Cantarell'; font-size:18pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">Please select origin.</p></body></html>", 0, QApplication::UnicodeUTF8));
        paidTextEdit->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Cantarell'; font-size:36pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">0.0</p></body></html>", 0, QApplication::UnicodeUTF8));
        chargeTextEdit->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Cantarell'; font-size:36pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">0.0</p></body></html>", 0, QApplication::UnicodeUTF8));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
