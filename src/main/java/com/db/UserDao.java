package com.db;

import com.bean.User;
import org.springframework.stereotype.Component;

@Component
public class UserDao {
    public User getUserInfo(){
        System.out.println("login dao....");
        return null;
    }
}
