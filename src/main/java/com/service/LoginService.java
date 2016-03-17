package com.service;

import com.bean.User;
import com.db.UserMapper;
import com.exception.UserNotFoundException;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class LoginService {

    @Resource(name = "userMapper")
    public UserMapper userMapper;

    public User login(User user) throws UserNotFoundException{
        List<User> users = userMapper.getUser(user.getName(), user.getPassword());

        if(users.size() == 0){
            throw new UserNotFoundException("User name or password error");
        }

        return users.get(0);
    }

    public UserMapper getUserMapper() {
        return userMapper;
    }

    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
}
