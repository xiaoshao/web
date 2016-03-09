package com.service;

import com.bean.User;
import com.db.UserMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class LoginService {
//
//    @Autowired
//    private UserDao userDao;

    @Resource(name = "userMapper")
    public UserMapper userMapper;

    public boolean login(User user){

        System.out.println("login service");
//        if(userDao.getUserInfo() == null){
//            return false;
//        }

        User user1 = userMapper.getUser("1");
        System.out.println(user1.getName());
        return true;
    }

    public UserMapper getUserMapper() {
        return userMapper;
    }

    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
}
