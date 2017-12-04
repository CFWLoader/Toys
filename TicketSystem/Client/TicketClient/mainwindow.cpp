#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <cmath>
#include <cstdio>

/*************************************************
Function:       MainWindow
Description:    Constructor of class MainWindow.
Calls:          Ui::MainWindow::setupUi()
Input:          QWidget *parent: the window.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow),
    coins(0),
    socket__(),
    allGreen(false)
{
    ui->setupUi(this);
}

/*************************************************
Function:       MainWindow
Description:    destructor of class MainWindow.
Calls:          None.
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
MainWindow::~MainWindow()
{
    delete ui;
}

/*************************************************
Function:       checkDestination()
Description:    Check the validation of origin and destination.
Calls:          QComboBox::currentText()
                QComboBox::operator==()
Input:          None.
Output:         None.
Return:         Integer value indicate the result.
Others:         None.
*************************************************/
int MainWindow::checkDestination()
{
    int equals = (ui->originBox->currentText() == ui->destinationBox->currentText());

    return equals;
}

/*************************************************
Function:       getNumberOfStations
Description:    Getting the number of stations between origin and destination.
Calls:          QComboBox::currentText()
Input:          None.
Output:         None.
Return:         Integer value indicate the result.
Others:         None.
*************************************************/
int MainWindow::getNumberOfStations()
{
    char origin =  ui->originBox->currentText()[0].toAscii();

    char destination = ui->destinationBox->currentText()[0].toAscii();

    int station = abs(origin - destination);

    return station;
}

/*************************************************
Function:       validateMoneyEnough
Description:    Checking whether the money is enough to pay the ticket.
Calls:          QString::setNum()
                QText::setText()
Input:          double price: the ticket's price.
Output:         None.
Return:         Integer value indicate the result.
Others:         None.
*************************************************/
int MainWindow::validateMoneyEnough(double price)
{
    double paid = static_cast<double>(coins);

    if(paid >= price)
    {
        double change = paid - price;

        QString changeValue;

        changeValue.setNum(change);

        ui->changeTextEdit->setText(changeValue);
    }
}

/*************************************************
Function:       checkState
Description:    A client want to confirm the ticket, the function will be invoked to validate all states.
Calls:          MainWindow::checkDestination()
                MainWindow::getNumberOfStations()
                QText::setText()
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
int MainWindow::checkState()
{
    if(this->checkDestination())
    {
        ui->hintTextEdit->setText("Please select valid destination.");

        return -1;
    }

    double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

    double paid = static_cast<double>(coins);

    if(paid < priceValue)
    {
        ui->hintTextEdit->setText("Please put in more coins.");

        return -2;
    }

    allGreen = true;

    return 0;
}

/*************************************************
Function:       clear
Description:    A deal done or cancelled, this function will be invoked to clear the states.
Calls:          QText::setText()
                QText::setNum()
Input:          None.
Output:         None.
Return:         None.
Others:         None.
*************************************************/
void MainWindow::clear()
{
    coins = 0;

    ui->hintTextEdit->setText("Please select origin.");

    QString numbers;

    numbers.setNum(0);

    ui->priceTextEdit->setText(numbers);

    ui->paidTextEdit->setText(numbers);

    ui->changeTextEdit->setText(numbers);
}

/*************************************************
Function:       on_originBox_activated
Description:    After the selection of origin event, this function will be invoked to handle the logic and ui.
Calls:          QText::setText()
Input:          const QString &arg1.
Output:         None.
Return:         void
Others:         None.
*************************************************/
void MainWindow::on_originBox_activated(const QString &arg1)
{
    ui->hintTextEdit->setText("Origin selected.Please select destination.");
}

/*************************************************
Function:       on_destinationBox_activated
Description:    After the selection of destination event, this function will be invoked to handle the logic and ui.
Calls:          QText::setText()
                QText::setNum()
Input:          const QString &arg1.
Output:         None.
Return:         void
Others:         None.
*************************************************/
void MainWindow::on_destinationBox_activated(const QString &arg1)
{
    if(this->checkDestination())
    {
        ui->hintTextEdit->setText("Please select valid destination.");
    }
    else
    {
        ui->hintTextEdit->setText("Please put in coins.");

        double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

        QString thePrice;

        thePrice.setNum(priceValue);

        ui->priceTextEdit->setText(thePrice);
    }
}

/*************************************************
Function:       on_putCoinsButton_clicked
Description:    After click of putCoinsButton event, this function will be invoked to handle the logic and ui.
Calls:          QText::setText()
                QText::setNum()
                MainWindow::getNumberOfStations()
                MainWindow::validateMoneyEnough()
Input:          None.
Output:         None.
Return:         void
Others:         None.
*************************************************/
void MainWindow::on_putCoinsButton_clicked()
{
    ++coins;

    QString thePaid;

    thePaid.setNum(coins);

    ui->paidTextEdit->setText(thePaid);

    double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

    this->validateMoneyEnough(priceValue);
}

/*************************************************
Function:       on_cancelButton_clicked
Description:    After click of cancelButton event, this function will be invoked to handle the logic and ui.
Calls:          QText::setText()
                QText::setNum()
Input:          None.
Output:         None.
Return:         void
Others:         None.
*************************************************/
void MainWindow::on_cancelButton_clicked()
{
    coins = 0;

    ui->hintTextEdit->setText("Please select origin.");

    QString numbers;

    numbers.setNum(0);

    ui->priceTextEdit->setText(numbers);

    ui->paidTextEdit->setText(numbers);

    ui->changeTextEdit->setText(numbers);
}

/*************************************************
Function:       on_confirmButton_clicked
Description:    After click of confirmButton event, this function will be invoked to handle the logic and ui.
Calls:          MainWindow::checkState()
                MainWindow::getNumberOfStations()
                std::snprintf()
                ClientSocket::sendString()
                MainWindow::clear()
Input:          None.
Output:         None.
Return:         void
Others:         None.
*************************************************/
void MainWindow::on_confirmButton_clicked()
{
    if(this->checkState() != 0)return;

    char rawData[256];

    double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

    double paid = static_cast<double>(coins);

    double change = paid - priceValue;

    std::snprintf(rawData, 256,
                  "{\"origin\":\"%s\", \"destination\":\"%s\", \"price\":\"%.2lf\", \"paid\":\"%.2lf\",\"change\":\"%.2lf\"}",
                  ui->originBox->currentText().toStdString().c_str(),
                  ui->destinationBox->currentText().toStdString().c_str(),
                  priceValue,
                  paid,
                  change
                  );

    socket__.sendString(std::string(rawData));

    this->clear();
}
