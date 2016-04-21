package com.service;

import com.bean.BlacklistModel;
import com.db.BlacklistMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BlacklistService {

    @Autowired
    public BlacklistMapper blacklistMapper;

    public List<BlacklistModel> getBlacklist() {
        return blacklistMapper.getBlacklist();
    }
}
