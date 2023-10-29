package com.worthwise.service;

import com.worthwise.dao.OneTimePasswordDAO;
import com.worthwise.entities.OneTimePassword;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OneTimePasswordService {

    private final OneTimePasswordDAO otpRepository;

    private static final String OTP_CHARS = "0123456789AaCcPpQqXxZzOoYyWw";
    private static final int OTP_LENGTH = 6;

    public static String generateOTP() {
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        Random random = new Random();
        for (int i = 0; i < OTP_LENGTH; i++) {
            int index = random.nextInt(OTP_CHARS.length());
            otp.append(OTP_CHARS.charAt(index));
        }
        return otp.toString();
    }

    public OneTimePassword save(OneTimePassword otp) {
        return otpRepository.save(otp);
    }

    public OneTimePassword generateOTP(String email) {
        OneTimePassword otp = new OneTimePassword();

        otp.setEmail(email);
        otp.setUsed(false);
        otp.setDateCreated(LocalDateTime.now());
        otp.setExpiresOn(LocalDateTime.now().plusMinutes(30));
        otp.setOTP(generateOTP());

        return otpRepository.save(otp);
    }

    public OneTimePassword getOtpByEmailAndOTP(String email, String otp) {
        return otpRepository.findByEmailAndOTP(email, otp);
    }
}
