package com.worthwise.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private double estimatedPrice;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @ManyToMany(mappedBy = "favoriteListings")
    private Set<Buyer> favoritedByBuyers;

    @ManyToMany(mappedBy = "viewedListings")
    private Set<Buyer> viewedByBuyers;

}
