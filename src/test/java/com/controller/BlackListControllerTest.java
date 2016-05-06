package com.controller;

import com.bean.Blacklist;
import com.service.BlacklistService;
import common.TestUtil;
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

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by zwshao on 4/24/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:config/application-context.xml",
        "classpath:config/error-servlet.xml", "classpath:config/servlet.xml",
        "classpath:config/db-config.xml"})
public class BlackListControllerTest {

    MockMvc mockMvc;

    @InjectMocks
    BlackListController blackListController;

    @Mock
    BlacklistService blacklistService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(blackListController).build();
    }

    @Test
    public void shouldAddTheBlacklist() throws Exception {
        Blacklist blackList = new Blacklist();
        blackList.setId(0);
        blackList.setImsi("18192729090");
        blackList.setName("xiaoshao");

        when(blacklistService.add(any())).thenReturn(blackList);

        mockMvc.perform(post("/addBlacklist")
                .content(TestUtil.convertObjectToJsonBytes(blackList))
                .contentType(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.name", is("xiaoshao")));

        verify(blacklistService, times(1)).add(blackList);
    }


}