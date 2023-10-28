package com.worthwise.service;

import com.worthwise.dao.UserDAO;
import com.worthwise.entities.User;
import com.worthwise.utils.Validators;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

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
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        if(!Validators.isValidPhoneNumber(user.getPhoneNumber())) {
            throw new IllegalArgumentException("Invalid phone number provided");
        }

        if(this.getUserByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with email: " + user.getEmail() + " already exists! Choose another email or login.");
        }

        user.setDateCreated(new Timestamp(System.currentTimeMillis()));
        // Save the user if validations pass
        return userDAO.save(user);
    }

    public User updateUser(Long userId, User updatedUser) {
        User existingUser = userDAO.findById(userId).orElse(null);
        if (existingUser != null) {
            // Update existingUser properties with updatedUser properties
            // Add validation logic if needed
            return userDAO.save(existingUser);
        }
        return null; // User not found
    }

    public void deleteUser(Long userId) {
        userDAO.deleteById(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

}
