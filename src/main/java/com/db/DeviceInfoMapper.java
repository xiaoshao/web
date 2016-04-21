package com.db;

import com.bean.DeviceModel;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by zwshao on 3/18/16.
 */
@Component
public interface DeviceInfoMapper {
    List<DeviceModel> getAllDevices();
}
