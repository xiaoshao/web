package com.service;

import com.bean.MenuItem;
import com.db.MenuMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class MenuService {

    @Resource(name = "menuMapper")
    MenuMapper menuMapper;

    public List<MenuItem> getMenu(){
        return menuMapper.getMenu1();
    }
}
