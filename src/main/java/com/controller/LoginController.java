package com.controller;

import com.bean.User;
import com.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zwshao on 2/26/16.
 */
@Controller
public class LoginController {

    @Autowired
    private LoginService login;

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    @ResponseBody
    public String hello() {
        return "hello world";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public User login(@RequestBody final User user, HttpServletResponse response) throws Exception{
        response.addCookie(new Cookie("test", "1234567"));
        login.login(user);
        return user;
    }

    @RequestMapping(value = "/test", method= RequestMethod.GET)
    @ResponseBody
    public String test() throws Throwable{
        throw new Exception("test");
    }


    public static void main(String[] args) {
        SpringApplication.run(LoginController.class, args);
    }
}
