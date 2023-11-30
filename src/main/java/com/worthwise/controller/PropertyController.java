package com.worthwise.controller;

import com.worthwise.entities.Property;
import com.worthwise.entities.User;
import com.worthwise.service.PropertyService;
import com.worthwise.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/property")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    private final UserService userService;

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @GetMapping("/all")
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/search")
    public List<Property> getSearchedProperties(@RequestParam String term) {
        return propertyService.getSearchedProperties(term);
    }

    @GetMapping("/listing/{id}")
    public List<Property> getListing(@PathVariable("id") Long sellerId) {
        return propertyService.getPropertyListing(sellerId);
    }

    @PostMapping("/estimate")
    public double estimateHomeValue(@RequestBody Property property) {
        return propertyService.estimateValue(property);
    }

    @PostMapping("/create")
    public ResponseEntity<Property> createProperty(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "sizeInSqft") double sizeInSqft,
            @RequestParam(value = "rooms") int rooms,
            @RequestParam(value = "location") String location,
            @RequestParam(value = "price") double price,
            @RequestParam(value = "builtDate") String builtDate,
            @RequestParam(value = "garages") int garages,
            @RequestParam(value = "hasPool") boolean hasPool,
            @RequestParam(value = "otherAmenities") String otherAmenities,
            @RequestParam(value = "securityRating") int securityRating,
            @RequestParam(value = "estimatedPrice") double estimatedPrice,
            @RequestParam(value = "seller") long seller) {

        try {
            Property property = new Property();
            property.setName(name);
            property.setDescription(description);
            property.setSizeInSqft(sizeInSqft);
            property.setRooms(rooms);
            property.setLocation(location);
            property.setPrice(price);
            property.setGarages(garages);
            property.setHasPool(hasPool);
            property.setOtherAmenities(otherAmenities);
            property.setSecurityRating(securityRating);
            property.setEstimatedPrice(estimatedPrice);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate parsedDate = LocalDate.parse(builtDate, formatter);
            Date convertedDate = Date.from(parsedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

            property.setBuiltDate(convertedDate);
            property.setSeller(new User(seller));

            if (image != null) {
                property.setImage(image.getBytes());
            }
            return ResponseEntity.ok(propertyService.createProperty(property));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "sizeInSqft") double sizeInSqft,
            @RequestParam(value = "rooms") int rooms,
            @RequestParam(value = "location") String location,
            @RequestParam(value = "garages") int garages,
            @RequestParam(value = "otherAmenities") String otherAmenities,
            @RequestParam(value = "securityRating") int securityRating) {

        try {
            Property updatedProperty = new Property();
            updatedProperty.setName(name);
            updatedProperty.setDescription(description);
            updatedProperty.setSizeInSqft(sizeInSqft);
            updatedProperty.setRooms(rooms);
            updatedProperty.setLocation(location);
            updatedProperty.setGarages(garages);
            updatedProperty.setOtherAmenities(otherAmenities);
            updatedProperty.setSecurityRating(securityRating);

            if (image != null) {
                updatedProperty.setImage(image.getBytes());
            }
            return ResponseEntity.ok(propertyService.updateProperty(id, updatedProperty));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/count")
    public long countPropertyBySeller(@RequestParam("sellerId") Long sellerId) {
        return propertyService.countPropertyBySeller(sellerId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }

    @PostMapping("user/favorites/add")
    public ResponseEntity<String> addFavoriteProperty(@RequestParam Long userId, @RequestParam Long propertyId) {
        try {
            userService.addFavoriteProperty(userId, propertyId);
            return ResponseEntity.ok("Property added to favorites successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding property to favorites");
        }
    }

    @PostMapping("/user/favorites/remove")
    public ResponseEntity<String> removeFavoriteProperty(@RequestParam Long userId, @RequestParam Long propertyId) {
        try {
            userService.removeFavoriteProperty(userId, propertyId);
            return ResponseEntity.ok("Property removed from favorites successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing property from favorites");
        }
    }

    @GetMapping("/user/favorites/{userId}")
    public ResponseEntity<List<Property>> getFavoriteProperties(@PathVariable Long userId) {
        try {
            List<Property> favoriteProperties = userService.getFavoriteProperties(userId);
            return ResponseEntity.ok(favoriteProperties);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
