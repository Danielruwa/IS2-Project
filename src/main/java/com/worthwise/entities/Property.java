package com.worthwise.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;

    private double sizeInSqft;
    private int rooms;
    private String location;
    private double price;
    private Date builtDate;
    private int garages;
    private boolean hasPool;
    private String otherAmenities;

    @Column(name = "security_rating")
    private int securityRating; // 1-10 where 1 is very insecure and 10 extremely secure

    private double estimatedPrice;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @ManyToMany(mappedBy = "favoriteListings")
    private Set<Buyer> favoritedByBuyers;

    @ManyToMany(mappedBy = "viewedListings")
    private Set<Buyer> viewedByBuyers;

    public Property(double sizeInSqft, int rooms, String location, double price, Date builtDate, int garages, boolean hasPool, String otherAmenities, int securityRating, double estimatedPrice) {
        this.sizeInSqft = sizeInSqft;
        this.rooms = rooms;
        this.location = location;
        this.price = price;
        this.builtDate = builtDate;
        this.garages = garages;
        this.hasPool = hasPool;
        this.otherAmenities = otherAmenities;
        this.securityRating = securityRating;
        this.estimatedPrice = estimatedPrice;
    }

    public Property(Long sellerId) {
        seller = new Seller();
        seller.setSellerId(sellerId);
    }
}
