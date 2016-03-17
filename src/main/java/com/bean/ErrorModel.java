package com.bean;

import java.io.Serializable;

/**
 * Created by zwshao on 3/17/16.
 */
public class ErrorModel implements Serializable{
    private String msg;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
