package com.bean;

import java.io.Serializable;

/**
 * Created by zwshao on 4/24/16.
 */
public class Monitor implements Serializable{

    private String id;
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
