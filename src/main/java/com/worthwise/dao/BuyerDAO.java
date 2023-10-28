package com.worthwise.dao;

import com.worthwise.entities.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyerDAO extends JpaRepository<Buyer, Long> {
}
