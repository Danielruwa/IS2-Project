package com.worthwise.controller;

import com.worthwise.entities.Buyer;
import com.worthwise.entities.Seller;
import com.worthwise.entities.User;
import com.worthwise.service.BuyerService;
import com.worthwise.service.SellerService;
import com.worthwise.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    public User registerUser(@RequestBody User user, @RequestPart MultipartFile file) {
        System.out.println(user);
        System.out.println(file);
        return null;
//        return userService.createUser(user);
    }

    @GetMapping("/test_endpoint")
    public String test() {
    return """
            {
                "name": "Ejuku Albert Ikwang'",
                "country": "Kenya",
                "occupation": "Software Engineer",
                "email": "albertejuku92@gmail.com"
            }
            """;
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
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
