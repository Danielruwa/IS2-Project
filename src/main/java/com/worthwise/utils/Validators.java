package com.worthwise.utils;

import java.util.regex.Pattern;

public class Validators {

    // Validate email format
    public static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && Pattern.matches(emailRegex, email);
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        // Regular expression to match phone numbers with or without country code
        String phoneRegex = "^(\\+254|0)\\d{9}$";
        return phoneNumber != null && Pattern.matches(phoneRegex, phoneNumber);
    }

    // Validate password strength (at least 8 characters, including uppercase, lowercase, and digits)
    public static boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
        return password != null && Pattern.matches(passwordRegex, password);
    }

}
