#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <cmath>
#include <cstdio>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow),
    coins(0),
    socket__(),
    allGreen(false)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

int MainWindow::checkDestination()
{
    int equals = (ui->originBox->currentText() == ui->destinationBox->currentText());

    return equals;
}

int MainWindow::getNumberOfStations()
{
    char origin =  ui->originBox->currentText()[0].toAscii();

    char destination = ui->destinationBox->currentText()[0].toAscii();

    int station = abs(origin - destination);

    return station;
}

int MainWindow::validateMoneyEnough(double price)
{
    double paid = static_cast<double>(coins);

    if(paid >= price)
    {
        double charge = paid - price;

        QString chargeValue;

        chargeValue.setNum(charge);

        ui->chargeTextEdit->setText(chargeValue);
    }
}

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

void MainWindow::clear()
{
    coins = 0;

    ui->hintTextEdit->setText("Please select origin.");

    QString numbers;

    numbers.setNum(0);

    ui->priceTextEdit->setText(numbers);

    ui->paidTextEdit->setText(numbers);

    ui->chargeTextEdit->setText(numbers);
}

void MainWindow::on_originBox_activated(const QString &arg1)
{
    ui->hintTextEdit->setText("Origin selected.Please select destination.");
}

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

void MainWindow::on_putCoinsButton_clicked()
{
    ++coins;

    QString thePaid;

    thePaid.setNum(coins);

    ui->paidTextEdit->setText(thePaid);

    double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

    this->validateMoneyEnough(priceValue);
}

void MainWindow::on_cancelButton_clicked()
{
    coins = 0;

    ui->hintTextEdit->setText("Please select origin.");

    QString numbers;

    numbers.setNum(0);

    ui->priceTextEdit->setText(numbers);

    ui->paidTextEdit->setText(numbers);

    ui->chargeTextEdit->setText(numbers);
}

void MainWindow::on_confirmButton_clicked()
{
    if(this->checkState() != 0)return;

    char rawData[256];

    double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

    double paid = static_cast<double>(coins);

    double charge = paid - priceValue;

    std::snprintf(rawData, 256,
                  "{\"origin\":\"%s\", \"destination\":\"%s\", \"price\":\"%.2lf\", \"paid\":\"%.2lf\",\"charge\":\"%.2lf\"}",
                  ui->originBox->currentText().toStdString().c_str(),
                  ui->destinationBox->currentText().toStdString().c_str(),
                  priceValue,
                  paid,
                  charge
                  );

    socket__.sendString(std::string(rawData));

    this->clear();
}
