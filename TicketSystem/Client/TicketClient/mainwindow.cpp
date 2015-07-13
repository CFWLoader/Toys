#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <cmath>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow),
    coins(0)
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

void MainWindow::on_originBox_activated(const QString &arg1)
{
    ui->hintPlainTextEdit->setText("Origin selected.Please select destination.");
}

void MainWindow::on_destinationBox_activated(const QString &arg1)
{
    if(this->checkDestination())
    {
        ui->hintPlainTextEdit->setText("Please select valid destination.");
    }
    else
    {
        ui->hintTextBrowser->setText("Please put in coins.");

        double priceValue = 0.5 * static_cast<double>(this->getNumberOfStations());

        QString thePrice;

        thePrice.setNum(priceValue);

        ui->priceTextEdit->setText(thePrice);
    }
}
