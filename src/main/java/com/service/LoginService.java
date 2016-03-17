package com.service;

import com.bean.User;
import com.db.UserMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class LoginService {

    @Resource(name = "userMapper")
    public UserMapper userMapper;

    public User login(User user) {
        return userMapper.getUser(user.getName(), user.getPassword());
    }

    public UserMapper getUserMapper() {
        return userMapper;
    }

    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
}
