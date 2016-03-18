package com.bean;

import java.util.List;

/**
 * Created by zwshao on 2/29/16.
 */
public class MenuItem {
    private int id;
    private String name;
    private String uri;
    private List<MenuItem> subMenuItem;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public List<MenuItem> getSubMenuItem() {
        return subMenuItem;
    }

    public void setSubMenuItem(List<MenuItem> subMenuItem) {
        this.subMenuItem = subMenuItem;
    }
}
