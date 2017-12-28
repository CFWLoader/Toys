package evan.server.models;

/**
 * Created by cfwloader on 4/1/15.
 */

/**
 * 这个model是留着用的，因为上机的时候可能没有数据库，我就不实现注册信息存到数据库了。
 * 登陆也是随意帐号就能登。
 */
public class User {
    int id;
    String username;
    String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
