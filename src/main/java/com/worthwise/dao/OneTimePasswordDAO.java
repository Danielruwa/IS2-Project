package com.worthwise.dao;

import com.worthwise.entities.OneTimePassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OneTimePasswordDAO extends JpaRepository<OneTimePassword, UUID> {
    OneTimePassword findByEmailAndOTP(String email, String otp);
}
