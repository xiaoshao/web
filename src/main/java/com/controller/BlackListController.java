package com.controller;

import com.service.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BlacklistController {

    @Autowired
    BlacklistService blacklistService;

    @RequestMapping(value = "/blacklist")
    public String getBlacklist() {
        return "main";
    }
}
