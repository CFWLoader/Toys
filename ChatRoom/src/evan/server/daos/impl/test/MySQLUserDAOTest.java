package evan.server.daos.impl.test;

import evan.server.utils.MySQLConnectionGenerator;
import org.junit.Test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by cfwloader on 4/1/15.
 */
public class MySQLUserDAOTest {
    @Test
    public void testCreateClause() throws SQLException {
        Connection connection = MySQLConnectionGenerator.getConnection();
        assert connection != null;
        String sql = "create table chatuser(id integer primary key auto_increment, username varchar(40) unique, password varchar(64));";
        Statement statement = connection.createStatement();
        statement.executeUpdate(sql);
    }
}
