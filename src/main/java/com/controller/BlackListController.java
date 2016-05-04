package com.controller;

import com.bean.Blacklist;
import com.service.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class BlackListController {

    @Autowired
    BlacklistService blacklistService;

    @RequestMapping(value = "/blacklist")
    @ResponseBody
    public List<Blacklist> getBlacklist() {
        return blacklistService.getBlacklist();
    }

    @RequestMapping(value = "/addBlacklist", method = RequestMethod.POST)
    public @ResponseBody Blacklist addBlackList(@RequestBody Blacklist blackList) {
//        Blacklist blackList1 = new Blacklist();
//        blackList1.setId(0);
//        blackList1.setImsi("18192729090");
//        blackList1.setName("xiaoshao");
//
//        return blackList1;
        return blacklistService.add(blackList);
    }
}
