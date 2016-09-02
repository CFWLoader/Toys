package nrs.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Created by Evan on 2016/9/2.
 */
public class ConnectionManager {

    static
    {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private ConnectionManager() {}

    public static Connection getConnection()
    {
        Connection connection = null;

        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/nrs", "cfwloader", "123456");
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return connection;
    }
}
