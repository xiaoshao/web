package com;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by zwshao on 3/27/16.
 */
public class Main {
    public static void main(String[] args) {

        MustacheFactory mf = new DefaultMustacheFactory();

        Mustache mustache = mf.compile("template/header.mustache");

        try {
            mustache.execute(new PrintWriter(System.out), new Main()).flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getName() {
        return "first name";
    }
}
