#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

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

private slots:

    void on_originBox_activated(const QString &arg1);

    void on_destinationBox_activated(const QString &arg1);

private:
    Ui::MainWindow *ui;

    int coins;
};

#endif // MAINWINDOW_H
