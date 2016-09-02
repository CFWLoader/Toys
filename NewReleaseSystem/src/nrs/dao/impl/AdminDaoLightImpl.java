package nrs.dao.impl;

import nrs.dao.AdminDao;
import nrs.entity.Admin;
import nrs.util.ConnectionManager;

import java.sql.Connection;

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

    }

    @Override
    public boolean login(String username, String password) {
        return false;
    }
}
