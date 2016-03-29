package com.controller;

import com.bean.DeviceModel;
import com.service.DeviceService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class DeviceController {

    Logger logger = Logger.getLogger(DeviceController.class);
    @Autowired
    DeviceService deviceService;

    @RequestMapping(value = "/deviceInfo")
    @ResponseBody
    public List<DeviceModel> getDevicesInfo() {
        return deviceService.getDevicesInfo();
    }

    @RequestMapping(value = "/deviceIndex")
    public String index(){
        return "deviceManagementTemplate";
    }
}
