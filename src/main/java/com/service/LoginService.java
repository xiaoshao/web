package com.service;

import com.bean.User;
import com.db.UserMapper;
import com.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LoginService {

    @Autowired
    public UserMapper userMapper;

    public User login(User user) throws UserNotFoundException{
        List<User> users = userMapper.getUser(user.getName(), user.getPassword());

        if(users.size() == 0){
            throw new UserNotFoundException("User name or password error");
        }
        System.out.println("**************");
        System.out.println(users.size());
        System.out.println("**************");
        return users.get(0);
    }
}
