package com.main.service;

import com.main.dto.IncomeDTO;
import com.main.repository.IncomeRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.activation.DataSource;

import java.io.IOException;
import java.util.*;
import java.io.ByteArrayOutputStream;
import java.security.Principal;

//this file is  part of money manager application
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;


    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendEmail(String to,String subject,String body){
        //implementation for sending mail
        //this could user JavaMailSender to send the email
        //ex.

        try{
            SimpleMailMessage message=new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendEmailWithAttachment(String to,String subject,String body, byte[] attchment,String filename) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);
        helper.addAttachment(filename,new ByteArrayResource(attchment));
        mailSender.send(message);

        //note - ensure that the attachment is not null and has content before calling
    }

    //newly added


    public void sendExcel( String to, String subject, String body, String filename, ByteArrayResource file) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);
        helper.addAttachment(filename, file);
        mailSender.send(message);
    }

}
