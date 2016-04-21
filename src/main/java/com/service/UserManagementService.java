package com.service;

import com.bean.User;
import com.db.UserMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zwshao on 4/20/16.
 */
@Component
public class UserManagementService {

    @Resource(name = "userMapper")
    UserMapper userMapper;

    public boolean createUser(String name, String password){
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        return userMapper.createUser(user);
    }
}
