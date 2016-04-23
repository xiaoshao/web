package com.db;

import com.bean.MenuItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MenuMapper {

    List<MenuItem> getMenu1();
}
