package com.db;

import com.bean.BlacklistModel;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BlacklistMapper {
    List<BlacklistModel> getBlacklist();
}
