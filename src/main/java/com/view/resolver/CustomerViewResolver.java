package com.view.resolver;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import java.util.Locale;

/**
 * Created by zwshao on 3/24/16.
 */
public class CustomerViewResolver extends AbstractViewResolver implements ViewResolver{

    @Override
    public View resolveViewName(String viewName, Locale locale) throws Exception {

        return new MyView(getTemplatePath(viewName));
    }
}
