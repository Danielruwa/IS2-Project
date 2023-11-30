package com.worthwise.dao;

import com.worthwise.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyDAO extends JpaRepository<Property, Long> {
    List<Property> findAllBySeller_UserId(Long sellerId);

    @Query("SELECT p FROM Property p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :term, '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :term, '%')) " +
            "OR LOWER(p.location) LIKE LOWER(CONCAT('%', :term, '%')) " +
            "ORDER BY " +
            "CASE WHEN LOWER(p.name) LIKE LOWER(CONCAT(:term, '%')) THEN 1 ELSE 0 END + " +
            "CASE WHEN LOWER(p.description) LIKE LOWER(CONCAT(:term, '%')) THEN 1 ELSE 0 END + " +
            "CASE WHEN LOWER(p.location) LIKE LOWER(CONCAT(:term, '%')) THEN 1 ELSE 0 END DESC")
    List<Property> getSearchedProperties(@Param("term") String term);

    long countBySeller_UserId(long userId);
}
