package com.exception;

/**
 * Created by zwshao on 3/17/16.
 */
public class UserNotFoundException extends Exception {
    public UserNotFoundException(String msg) {
        super(msg);
    }
}
