package com.worthwise.service;

import com.worthwise.dao.PropertyDAO;
import com.worthwise.dao.UserDAO;
import com.worthwise.entities.OneTimePassword;
import com.worthwise.entities.Property;
import com.worthwise.entities.User;
import com.worthwise.utils.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserDAO userDAO;
    private final EmailService emailService;
    private final OneTimePasswordService oneTimePasswordService;
    private final PropertyService propertyService;
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    @Transactional
    public User getUserById(Long userId) {
        return userDAO.findById(userId).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userDAO.findByEmail(email);
    }

    public User createUser(User user) {
        // Validate email format
        if (!Validators.isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email address format");
        }

        // Validate password length
        if (!Validators.isValidPassword(user.getPassword())) {
            throw new IllegalArgumentException("Password must be at least 8 characters, including uppercase, lowercase, and digits");
        }

        if (!Validators.isValidPhoneNumber(user.getPhoneNumber())) {
            throw new IllegalArgumentException("Invalid phone number provided");
        }

        if (this.getUserByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with email: " + user.getEmail() + " already exists! Choose another email or login.");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setDateCreated(new Timestamp(System.currentTimeMillis()));
        return userDAO.save(user);
    }

    public User updateUser(Long userId, User updatedUser) {
        User existingUser = userDAO.findById(userId).orElse(null);
        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            if (updatedUser.getProfilePhoto() != null) {
                existingUser.setProfilePhoto(updatedUser.getProfilePhoto());
            }
            return userDAO.save(existingUser);
        }
        return null;
    }

    public void deleteUser(Long userId) {
        userDAO.deleteById(userId);
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getUserByEmail(username);
    }

    public Map<String, Object> sendPasswordResetEmail(String email) {
        User employee = getUserByEmail(email);
        if (employee == null) {
            return Map.of("message", "No User with this email", "status", false);
        }
        String type = "Worth Wise Account";
        String passwordResetLink = "http://localhost:3000/login?action=passwordReset";
        boolean send = emailService.sendPasswordResetEmail(email, passwordResetLink, oneTimePasswordService.generateOTP(email).getOTP(), type);
        if (send) {
            return Map.of("message", "Password reset email sent to this email address", "status", true);
        } else {
            return Map.of("message", "Could not send email", "status", false);

        }
    }

    @Transactional
    public Map<String, Object> resetPassword(Map<String, Object> map) {
        User user = getUserByEmail(String.valueOf(map.get("email")));
        if (user == null) {
            return Map.of("message", "No user with this email", "status", false);
        }

        OneTimePassword otp = oneTimePasswordService.getOtpByEmailAndOTP(String.valueOf(map.get("email")), String.valueOf(map.get("otp")));
        if (otp == null) {
            return Map.of("message", "The OTP was not found", "status", false);
        }

        if (otp.isUsed()) {
            return Map.of("message", "The OTP has been used!", "status", false);

        }
        if (otp.getExpiresOn().isBefore(LocalDateTime.now())) {
            return Map.of("message", "The OTP has expired!", "status", false);
        }
        otp.setUsed(true);
        oneTimePasswordService.save(otp);

        user.setPassword(encoder.encode(String.valueOf(map.get("password"))));
        userDAO.save(user);
        return Map.of("message", "Password has been updated successfully", "status", true);
    }

    @Transactional
    public boolean addFavoriteProperty(Long userId, Long propertyId) {
        User user = getUserById(userId);
        Property property = propertyService.getPropertyById(propertyId);
        boolean returnType = false;
        if (user != null && property != null) {
            Set<Property> propertyList = new HashSet<>(user.getFavoriteListings());
            if(user.getFavoriteListings().contains(property)) {
                propertyList.remove(property);
            } else {
                propertyList.add(property);
                returnType = true;
            }
            user.setFavoriteListings(propertyList);
            userDAO.save(user);
        }

        return returnType;
    }

    @Transactional
    public List<Property> getFavoriteProperties(Long userId) {
        User user = getUserById(userId);

        if (user != null) {
            return new ArrayList<>(user.getFavoriteListings());
        }

        return Collections.emptyList();
    }


}
