package com.worthwise.service;

import com.worthwise.dao.BuyerDAO;
import com.worthwise.entities.Buyer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BuyerService {

    private final BuyerDAO buyerDAO;

    @Autowired
    public BuyerService(BuyerDAO buyerDAO) {
        this.buyerDAO = buyerDAO;
    }

    public List<Buyer> getAllBuyers() {
        return buyerDAO.findAll();
    }

    public Buyer getBuyerById(Long buyerId) {
        return buyerDAO.findById(buyerId).orElse(null);
    }

    public Buyer createBuyer(Buyer buyer) {
        // Add validation logic if needed
        return buyerDAO.save(buyer);
    }

    public Buyer updateBuyer(Long buyerId, Buyer updatedBuyer) {
        Buyer existingBuyer = buyerDAO.findById(buyerId).orElse(null);
        if (existingBuyer != null) {
            // Update existingBuyer properties with updatedBuyer properties
            // Add validation logic if needed
            return buyerDAO.save(existingBuyer);
        }
        return null; // Buyer not found
    }

    public void deleteBuyer(Long buyerId) {
        buyerDAO.deleteById(buyerId);
    }

}
