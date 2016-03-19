package com.service;

import com.bean.DeviceModel;
import com.db.DeviceInfoMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class DeviceService {


    @Resource(name = "deviceInfoMapper")
    DeviceInfoMapper deviceInfoMapper;

    public List<DeviceModel> getDevicesInfo() {
        return deviceInfoMapper.getAllDevices();
    }
}
