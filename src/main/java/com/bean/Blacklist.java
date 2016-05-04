package com.bean;

import java.io.Serializable;
import java.util.List;

public class Blacklist implements Serializable{
    private int id;
    private String imsi;
    private String name;

    private List<Monitor> monitors;

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

    public List<Monitor> getMonitors() {
        return monitors;
    }

    public void setMonitors(List<Monitor> monitors) {
        this.monitors = monitors;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Blacklist blacklist = (Blacklist) o;

        if (id != blacklist.id) return false;
        if (imsi != null ? !imsi.equals(blacklist.imsi) : blacklist.imsi != null) return false;
        if (name != null ? !name.equals(blacklist.name) : blacklist.name != null) return false;
        return !(monitors != null ? !monitors.equals(blacklist.monitors) : blacklist.monitors != null);

    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (imsi != null ? imsi.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (monitors != null ? monitors.hashCode() : 0);
        return result;
    }
}
