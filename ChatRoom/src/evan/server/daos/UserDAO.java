package evan.server.daos;

import evan.server.models.User;

/**
 * Created by cfwloader on 4/1/15.
 */

/**
 * 怕上机没有数据库，这个接口值只是留着看的。
 */
public interface UserDAO {
    boolean saveUser(User user);
    boolean deleteUser(User user);
    boolean updateUser(User user);
    User login(String username, String password);
}
