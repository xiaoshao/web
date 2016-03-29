package com.view.resolver;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by zwshao on 3/24/16.
 */
public class MyView implements View{
    private String viewName;
    MustacheFactory mf = new DefaultMustacheFactory();


    public MyView(String viewName) {
        this.viewName = viewName;
    }

    @Override
    public String getContentType() {
        return "text/html; charset=zh-CN";
    }

    @Override
    public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        Mustache mustache = mf.compile(viewName);

        response.setContentType("text/html; charset=UTF-8");
        mustache.execute(response.getWriter(), model);
    }
}
