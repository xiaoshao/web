package com.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CookieCheckInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getServletPath().contains("login")) {
            return super.preHandle(request, response, handler);
        }

        Cookie[] cookies = request.getCookies();

        if (cookies == null || !validCookie(cookies)) {
            redirectToLogin(request, response);
            return false;
        }

        return super.preHandle(request, response, handler);
    }

    private void redirectToLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_PAYMENT_REQUIRED);
        RequestDispatcher rd = request.getRequestDispatcher("index.html");
        rd.forward(request, response);
    }

    private boolean validCookie(Cookie[] cookies) {
        for (Cookie cookie : cookies) {
            if ("1234567".equals(cookie.getValue())) {
                return true;
            }
        }
        return false;
    }
}
