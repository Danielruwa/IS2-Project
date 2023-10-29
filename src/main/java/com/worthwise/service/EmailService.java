package com.worthwise.service;

import com.worthwise.utils.Constants;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public boolean sendPasswordResetEmail(String recipientEmail, String passwordResetLink, String oneTimePassword, String type) {
        String htmlContent = "<p><b>Dear user</b>,</p>"
                + "<p>A password reset request was submitted from your " + type +  " associated with this email address - " + recipientEmail + ". If you did not authorize this request, simply ignore this email.</p>"
                + "<p>However, if you did initiate the password reset, please follow the link below to reset your password. This link will expire in 30 minutes.</p>"
                + "<p><a href=\"" + passwordResetLink + "\">" + passwordResetLink + "</a></p>"
                + "<p><b>One Time Password (Valid for 30 minutes): </b>" + oneTimePassword + "</p>"
                + "<p>If you experience any issues or concerns, please contact our support team at " + Constants.EMAIL + "info.dev@gmail.com.</p>"
                + "<p>Thank you for using Worth Wise.</p>"
                + "<p>Best regards,</p>"
                + "<p>The Worth Wise Team</p>";

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(Constants.EMAIL);
            helper.setTo(recipientEmail);
            helper.setSubject("Password Reset Request");
            helper.setText(htmlContent, true);
            mailSender.send(message);
            return true;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}
