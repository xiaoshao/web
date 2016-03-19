package com.db;

import com.bean.DeviceModel;

import java.util.List;

/**
 * Created by zwshao on 3/18/16.
 */
public interface DeviceInfoMapper {
    List<DeviceModel> getAllDevices();
}
