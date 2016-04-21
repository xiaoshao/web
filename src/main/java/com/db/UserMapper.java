package com.db;

import com.bean.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by zwshao on 3/8/16.
 */
@Component
public interface UserMapper {
        @Select("SELECT * FROM user WHERE name = #{name} and password = #{password}")
        List<User> getUser(@Param("name") String name, @Param("password") String password);

        boolean createUser(User user);
}
