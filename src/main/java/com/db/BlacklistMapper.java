package com.db;

import com.bean.Blacklist;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BlacklistMapper {
    List<Blacklist> getBlacklist();

    Blacklist addBlackList(Blacklist blacklist);
}
