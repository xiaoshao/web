package com.service;

import com.bean.DeviceModel;
import com.db.DeviceInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeviceService {

    @Autowired
    DeviceInfoMapper deviceInfoMapper;

    public List<DeviceModel> getDevicesInfo() {
        return deviceInfoMapper.getAllDevices();
    }
}
