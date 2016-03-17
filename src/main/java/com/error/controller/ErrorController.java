package com.error.controller;

import com.bean.ErrorModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class ErrorController {

    @RequestMapping(value = "/handler")
    @ResponseBody
    public ErrorModel handlerError(HttpServletRequest request, HttpServletResponse response){
        ErrorModel errorModel = new ErrorModel();
        errorModel.setMsg(request.getAttribute("javax.servlet.error.message").toString());
        response.setStatus(404);
        return errorModel;
    }
}
