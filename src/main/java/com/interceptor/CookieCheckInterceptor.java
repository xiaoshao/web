package com.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieCheckInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getServletPath().contains("login")) {
            return super.preHandle(request, response, handler);
        }

        Cookie[] cookies = request.getCookies();

        if (!validCookie(cookies)) {
            throw new RuntimeException("Did not login.");
        }

        return super.preHandle(request, response, handler);
    }

    private boolean validCookie(Cookie[] cookies) {
        for (Cookie cookie : cookies) {
            if ("1234567".equals(cookies[0].getValue())) {
                return true;
            }
        }
        return false;
    }
}
