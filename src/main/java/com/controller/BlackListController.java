package com.controller;

import com.bean.BlacklistModel;
import com.service.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class BlacklistController {

    @Autowired
    BlacklistService blacklistService;

    @RequestMapping(value = "/blacklist")
    public List<BlacklistModel> getBlacklist() {
        return blacklistService.getBlacklist();
    }
}
