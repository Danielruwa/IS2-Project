package com.worthwise.controller;

import com.worthwise.entities.Buyer;
import com.worthwise.entities.Seller;
import com.worthwise.entities.User;
import com.worthwise.service.BuyerService;
import com.worthwise.service.SellerService;
import com.worthwise.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1")
@RestController
public class WorthwiseController {

    private final UserService userService;
    private final BuyerService buyerService;
    private final SellerService sellerService;

    @Autowired
    public WorthwiseController(UserService userService, BuyerService buyerService, SellerService sellerService) {
        this.userService = userService;
        this.buyerService = buyerService;
        this.sellerService = sellerService;
    }

    // Authentication and User Management Endpoints
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        return userService.createUser(user);
    }

    @PutMapping("password-reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, Object> map) {
        Map<String, Object> passwordReset = userService.resetPassword(map);
        return ResponseEntity.status(200).body(passwordReset);
    }

    @GetMapping("/test_endpoint")
    public String test() {
    return """
            {
                "name": "Daniel Ruwa",
                "country": "Kenya",
                "occupation": "Software Engineer",
                "email": "danr@gmail.com"
            }
            """;
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/user/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "phoneNumber") String phoneNumber
    ) {
        try {
            byte[] profilePhoto = (profilePicture != null) ? profilePicture.getBytes() : null;

            User updatedUser = new User();
            updatedUser.setUserId(id);
            updatedUser.setName(name);
            updatedUser.setEmail(email);
            updatedUser.setPhoneNumber(phoneNumber);
            updatedUser.setProfilePhoto(profilePhoto);

            // Update the user
            return userService.updateUser(id, updatedUser);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    // Buyer Functionalities Endpoints
    @GetMapping("/buyers")
    public List<Buyer> getAllBuyers() {
        return buyerService.getAllBuyers();
    }

    @GetMapping("/buyer/{id}")
    public Buyer getBuyerById(@PathVariable Long id) {
        return buyerService.getBuyerById(id);
    }

    @PostMapping("/buyer/create")
    public Buyer createBuyer(@RequestBody Buyer buyer) {
        return buyerService.createBuyer(buyer);
    }

    // Seller Functionalities Endpoints
    @GetMapping("/sellers")
    public List<Seller> getAllSellers() {
        return sellerService.getAllSellers();
    }

    @GetMapping("/seller/{id}")
    public Seller getSellerById(@PathVariable Long id) {
        return sellerService.getSellerById(id);
    }

    @PostMapping("/seller/create")
    public Seller createSeller(@RequestBody Seller seller) {
        return sellerService.createSeller(seller);
    }

}
