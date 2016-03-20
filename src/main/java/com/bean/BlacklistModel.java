package com.bean;

import java.io.Serializable;
import java.sql.Timestamp;

public class BlacklistModel implements Serializable{
    private int id;
    private String imsi;
    private String imei;
    private Timestamp ctime;
    private Timestamp mtime;
    private String name;
    private String esn;
    private int smsid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImsi() {
        return imsi;
    }

    public void setImsi(String imsi) {
        this.imsi = imsi;
    }

    public String getImei() {
        return imei;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }

    public Timestamp getCtime() {
        return ctime;
    }

    public void setCtime(Timestamp ctime) {
        this.ctime = ctime;
    }

    public Timestamp getMtime() {
        return mtime;
    }

    public void setMtime(Timestamp mtime) {
        this.mtime = mtime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEsn() {
        return esn;
    }

    public void setEsn(String esn) {
        this.esn = esn;
    }

    public int getSmsid() {
        return smsid;
    }

    public void setSmsid(int smsid) {
        this.smsid = smsid;
    }
}
