package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MoneyManagerApplication {
    public static void main (String[] args){
        SpringApplication.run(MoneyManagerApplication.class,args);
        System.out.println("Welcome to Money Manager");
    }
}
