package nrs.dao;

import nrs.entity.Admin;

/**
 * Created by Evan on 2016/9/2.
 */
public interface AdminDao {

    void addAdmin(Admin admin);

    boolean login(String username, String password);

}
