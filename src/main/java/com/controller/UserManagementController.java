package com.controller;

import com.bean.User;
import com.exception.DatabaseException;
import com.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by zwshao on 4/21/16.
 */

@Controller
public class UserManagementController {

    @Autowired
    UserManagementService userManagementService;

    @RequestMapping(value = "addUser", method = RequestMethod.POST)
    public User addUser(@RequestBody final User user) throws DatabaseException {
        return userManagementService.createUser(user);
    }
}
