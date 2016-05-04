package com.bean;

import java.io.Serializable;

/**
 * Created by zwshao on 2/26/16.
 */
public class User implements Serializable {

    private String id;
    private String name;
    private String password;

    public User(){}

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != null ? !id.equals(user.id) : user.id != null) return false;
        if (name != null ? !name.equals(user.name) : user.name != null) return false;
        return !(password != null ? !password.equals(user.password) : user.password != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }

    //    @Override
//    public boolean equals(Object obj) {
//        if(!(obj instanceof User)){
//            return false;
//        }
//
//        User that = (User)obj;
//
//        if (isEqual(this.getId(), that.getId()) &&
//                isEqual(this.getName(), that.getName()) &&
//                isEqual(this.getPassword(), that.getPassword()))
//            return false;
//
//
//        return true;
//    }
//
//    private<T> boolean isEqual(T param1, T Param2) {
//        if(param1 == null){
//            if(Param2 == null){
//                return true;
//            }
//        }else {
//            if(param1.equals(Param2)){
//                return true;
//            }
//        }
//
//        return false;
//    }
}
