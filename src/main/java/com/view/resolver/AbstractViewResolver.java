package com.view.resolver;

import java.io.File;

/**
 * Created by zwshao on 3/28/16.
 */
public class AbstractViewResolver {
    private String suffix;
    private String prefix;

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getTemplatePath(String viewName) {
        StringBuilder sb = new StringBuilder(prefix);
        sb.append(File.separatorChar)
                .append(viewName)
                .append(".")
                .append(suffix);

        return sb.toString();
    }
}
