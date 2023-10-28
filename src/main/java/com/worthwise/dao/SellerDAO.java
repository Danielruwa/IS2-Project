package com.worthwise.dao;

import com.worthwise.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerDAO extends JpaRepository<Seller, Long> {
}
