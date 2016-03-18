package com.controller;

import com.bean.MenuItem;
import com.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by zwshao on 2/29/16.
 */
@Controller
public class MenuController {

    @Autowired
    MenuService menuService;

    @RequestMapping(value = "/menu")
    @ResponseBody
    public List<MenuItem> getMenu() {
        return menuService.getMenu();
    }
}
