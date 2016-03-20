package com.service;

import com.bean.BlacklistModel;
import com.db.BlacklistMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class BlacklistService {


    @Resource(name="blacklistMapper")
    BlacklistMapper blacklistMapper;

    public List<BlacklistModel> getBlacklist() {
        return blacklistMapper.getBlacklist();
    }
}
