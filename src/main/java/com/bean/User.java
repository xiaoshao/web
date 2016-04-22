package com.bean;

import java.io.Serializable;

/**
 * Created by zwshao on 2/26/16.
 */
public class User implements Serializable {

    private String id;
    private String name;
    private String password;

    public User(String id) {
        this.id = id;
    }

    public User(String name, String password){
        this.name = name;
        this.password =password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
