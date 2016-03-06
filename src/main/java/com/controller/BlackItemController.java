package com.controller;

import com.bean.BlackItem;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * Created by zwshao on 2/29/16.
 */
@Controller
public class BlackItemController {

    public List<BlackItem> getAllBlackItems(){
        return null;
    }

    public boolean addBlackItem(@RequestBody BlackItem blackItem){
        return true;
    }

    public boolean removeBlackItem(@RequestBody BlackItem blackItem){
        return false;
    }

    public boolean updateBlackItem(@RequestBody BlackItem blackItem){
        return false;
    }
}
