/*************************************************
Copyright:      clown
Author:         Evan
Date:           2015-07-20
Description:    Implement the UI of client and the reponse of client request.
**************************************************/
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

#include <ClientSocket.h>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);

    ~MainWindow();

    int checkDestination();

    int getNumberOfStations();

    int validateMoneyEnough(double);

    int checkState();

    void clear();

private slots:

    void on_originBox_activated(const QString &arg1);

    void on_destinationBox_activated(const QString &arg1);

    void on_putCoinsButton_clicked();

    void on_cancelButton_clicked();

    void on_confirmButton_clicked();

private:
    Ui::MainWindow *ui;

    int coins;

    ClientSocket socket__;

    bool allGreen;
};

#endif // MAINWINDOW_H
