package com.controller;

import com.bean.User;
import com.exception.UserNotFoundException;
import com.service.LoginService;
import common.TestUtil;
import org.hamcrest.core.IsEqual;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by zwshao on 4/21/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:config/application-context.xml",
        "classpath:config/error-servlet.xml", "classpath:config/servlet.xml",
        "classpath:config/db-config.xml"})
public class UserManagementControllerTest {

    MockMvc mockMvc;

    @Mock
    private LoginService loginService;

    @InjectMocks
    private LoginController loginController;

    @Before
    public void setup() throws UserNotFoundException {
        MockitoAnnotations.initMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(loginController).build();
    }

    @Test
    public void shouldCallTheLoginServiceToCheckUser() throws Exception {

        User loginAccount = new User("test", "123456");
        when(loginService.login(loginAccount)).thenReturn(new User("test", null));

        mockMvc.perform(post("/login")
                .content(TestUtil.convertObjectToJsonBytes(loginAccount))
                .contentType(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().is(200));

        verify(loginService, times(1)).login(argThat(new IsEqual<User>(new User("", ""))));
    }

}