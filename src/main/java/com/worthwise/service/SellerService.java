package com.worthwise.service;

import com.worthwise.dao.SellerDAO;
import com.worthwise.entities.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SellerService {

    private final SellerDAO sellerDAO;

    @Autowired
    public SellerService(SellerDAO sellerDAO) {
        this.sellerDAO = sellerDAO;
    }

    public List<Seller> getAllSellers() {
        return sellerDAO.findAll();
    }

    public Seller getSellerById(Long sellerId) {
        return sellerDAO.findById(sellerId).orElse(null);
    }

    public Seller createSeller(Seller seller) {
        // Add validation logic if needed
        return sellerDAO.save(seller);
    }

    public Seller updateSeller(Long sellerId, Seller updatedSeller) {
        Seller existingSeller = sellerDAO.findById(sellerId).orElse(null);
        if (existingSeller != null) {
            // Update existingSeller properties with updatedSeller properties
            // Add validation logic if needed
            return sellerDAO.save(existingSeller);
        }
        return null; // Seller not found
    }

    public void deleteSeller(Long sellerId) {
        sellerDAO.deleteById(sellerId);
    }
}
