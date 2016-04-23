package com.exception;

/**
 * Created by zwshao on 4/21/16.
 */
public class DatabaseException extends Exception{
    public DatabaseException(){
        super("Database is not available, plz connect admin.");
    }

}
