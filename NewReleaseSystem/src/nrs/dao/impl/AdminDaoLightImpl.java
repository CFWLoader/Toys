package nrs.dao.impl;

import nrs.dao.AdminDao;
import nrs.entity.Admin;
import nrs.util.ConnectionManager;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by Evan on 2016/9/2.
 */
public class AdminDaoLightImpl implements AdminDao {

    private Connection connection;

    public AdminDaoLightImpl()
    {
        connection = ConnectionManager.getConnection();
    }

    @Override
    public void addAdmin(Admin admin) {

        Statement statement = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String query = "insert into nrs_admin(admin_username, admin_password) values ('" + admin.getUsername() + "', ' " + admin .getPassword() + " ');";

        try {
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean login(String username, String password) {

        Statement statement = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String query = "select * from nrs_admin where admin_username='" + username + "' and admin_password='" + password +"';";

        try {

            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next())
            {
                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
}
