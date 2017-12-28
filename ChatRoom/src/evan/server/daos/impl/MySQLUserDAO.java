package evan.server.daos.impl;

import com.mysql.jdbc.MySQLConnection;
import evan.server.daos.UserDAO;
import evan.server.models.User;
import evan.server.utils.MySQLConnectionGenerator;

import java.sql.Connection;

/**
 * Created by cfwloader on 4/1/15.
 */
public class MySQLUserDAO implements UserDAO{

    Connection connection;

    public MySQLUserDAO(){
        connection = MySQLConnectionGenerator.getConnection();
    }

    @Override
    public boolean saveUser(User user) {
        return false;
    }

    @Override
    public boolean deleteUser(User user) {
        return false;
    }

    @Override
    public boolean updateUser(User user) {
        return false;
    }

    @Override
    public User login(String username, String password) {
        return null;
    }
}
