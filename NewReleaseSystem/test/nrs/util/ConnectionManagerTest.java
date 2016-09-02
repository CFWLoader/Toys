package nrs.util;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by Evan on 2016/9/2.
 */
public class ConnectionManagerTest {

    public static void main(String[] args)
    {
        testGetConnection();
    }

    public static void testGetConnection()
    {
        Connection connection = ConnectionManager.getConnection();

        if(connection == null)
        {
            System.out.println("Null pointer!!!!");
        }

        try {
            Statement statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
