package com.worthwise.entities;


import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;

    private String name;

    @Lob
    private String description;

    private double sizeInSqft;
    private int rooms;
    private String location;
    private double price;
    private Date builtDate;
    private int garages;
    private boolean hasPool;
    private String otherAmenities;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;


    @Column(name = "security_rating")
    private int securityRating; // 1-10 where 1 is very insecure and 10 extremely secure

    private double estimatedPrice;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToMany(mappedBy = "favoriteListings", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<User> favoritedByBuyers;

    @ManyToMany(mappedBy = "viewedListings")
    private Set<User> viewedByBuyers;

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
        seller = new User();
        seller.setUserId(sellerId);
    }

}
