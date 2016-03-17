package com.db;

import com.bean.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * Created by zwshao on 3/8/16.
 */
public interface UserMapper {
        @Select("SELECT * FROM user WHERE id = #{userId} and password = #{password}")
        User getUser(@Param("name") String name, @Param("password") String password);
}
