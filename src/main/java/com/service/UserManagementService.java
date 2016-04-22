package com.service;

import com.bean.User;
import com.db.UserMapper;
import com.exception.DatabaseException;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class UserManagementService {

    @Resource(name = "userMapper")
    UserMapper userMapper;

    public User createUser(User user) throws DatabaseException {
        try {
            return userMapper.createUser(user);
        }catch (Exception e){
            throw new DatabaseException();
        }
    }
}
