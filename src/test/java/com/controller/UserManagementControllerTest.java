package com.controller;

import com.bean.User;
import com.service.LoginService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

/**
 * Created by zwshao on 4/21/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:config/application-context.xml",
        "classpath:config/error-servlet.xml", "classpath:config/servlet.xml",
        "classpath:config/db-config.xml"})
@WebAppConfiguration
public class UserManagementControllerTest {

    MockMvc mockMvc;

    @Autowired
    private LoginService loginService;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        loginService = Mockito.mock(LoginService.class);
        Mockito.reset(loginService);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void shouldCallTheLoginServiceToCheckUser() throws Exception {
        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .param("name", "test")
                .param("password", "123456"));

        verify(loginService, times(0)).login(new User("test", "123456"));
    }
}