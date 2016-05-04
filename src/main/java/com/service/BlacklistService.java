package com.service;

import com.bean.Blacklist;
import com.db.BlacklistMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BlacklistService {

    @Autowired
    public BlacklistMapper blacklistMapper;

    public List<Blacklist> getBlacklist() {
        return blacklistMapper.getBlacklist();
    }

    public Blacklist add(Blacklist blackList) {
        return blackList;
    }
}
