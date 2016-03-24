package com.view.resolver;

import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by zwshao on 3/24/16.
 */
public class MyView implements View{
    @Override
    public String getContentType() {
        return "application/json";
    }

    @Override
    public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        response.getWriter().write("Hello world");
        response.getWriter().flush();
    }
}
