package com.worthwise.entities;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String phoneNumber;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] profilePhoto;

    private Timestamp dateCreated;
    private Timestamp dateModified;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.BUYER; // Enum: BUYER, SELLER

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "buyer_favorite_listings",
            joinColumns = @JoinColumn(name = "buyer_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )
    private Set<Property> favoriteListings;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "buyer_viewed_listings",
            joinColumns = @JoinColumn(name = "buyer_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )
    private Set<Property> viewedListings;

    public User(long seller) {
        this.userId = seller;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(role == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(role.ordinal());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void addFavoriteListing(Property property) {
        favoriteListings.add(property);
        property.getFavoritedByBuyers().add(this);
    }

    public void removeFavoriteListing(Property property) {
        favoriteListings.remove(property);
        property.getFavoritedByBuyers().remove(this);
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", dateCreated=" + dateCreated +
                ", dateModified=" + dateModified +
                ", role=" + role +
                ", favoriteListings=" + favoriteListings +
                ", viewedListings=" + viewedListings +
                '}';
    }
}
