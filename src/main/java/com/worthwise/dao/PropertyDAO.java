package com.worthwise.dao;

import com.worthwise.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyDAO extends JpaRepository<Property, Long> {
}
