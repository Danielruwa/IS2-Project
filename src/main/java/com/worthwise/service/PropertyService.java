package com.worthwise.service;

import com.worthwise.dao.PropertyDAO;
import com.worthwise.entities.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Service
public class PropertyService {

    private final PropertyDAO propertyDAO;

    @Autowired
    public PropertyService(PropertyDAO propertyDAO) {
        this.propertyDAO = propertyDAO;
    }

    public List<Property> getAllProperties() {
        return propertyDAO.findAll();
    }

    public Property getPropertyById(Long propertyId) {
        return propertyDAO.findById(propertyId).orElse(null);
    }

    public Property createProperty(Property property) {
        return propertyDAO.save(property);
    }

    public Property updateProperty(Long propertyId, Property updatedProperty) {
        Property existingProperty = propertyDAO.findById(propertyId).orElse(null);
        if (existingProperty != null) {
            existingProperty.setName(updatedProperty.getName());
            existingProperty.setDescription(updatedProperty.getDescription());
            existingProperty.setSizeInSqft(updatedProperty.getSizeInSqft());
            existingProperty.setRooms(updatedProperty.getRooms());
            existingProperty.setLocation(updatedProperty.getLocation());
            existingProperty.setGarages(updatedProperty.getGarages());
            existingProperty.setOtherAmenities(updatedProperty.getOtherAmenities());
            existingProperty.setSecurityRating(updatedProperty.getSecurityRating());
            if(updatedProperty.getImage() != existingProperty.getImage() && updatedProperty.getImage() != null) {
                existingProperty.setImage(updatedProperty.getImage());
            }
            return propertyDAO.save(existingProperty);
        }
        return null;
    }

    public void deleteProperty(Long propertyId) {
        propertyDAO.deleteById(propertyId);
    }

    public double estimateValue(Property property) {
        // Base price for the property in Kenyan Shillings (KES)
        double basePrice = 2_000_000; // Example base price in KES

        // Factors affecting property value in KES
        double sizeFactor = 2_000; // Price per square foot in KES
        double roomFactor = 150_000; // Price per room in KES
        double garageFactor = 100_000; // Price per garage in KES
        double securityFactor = 50_000; // Price per security rating point in KES
        double poolFactor = 200_000; // Price addition for having a pool in KES
        double amenitiesFactor = 100_000; // Price addition for other amenities in KES
        double ageFactor = -10_000; // Price deduction for each year of age in KES

        // Calculate estimated value based on property features
        double estimatedValue = basePrice +
                (property.getSizeInSqft() * sizeFactor) +
                (property.getRooms() * roomFactor) +
                (property.getGarages() * garageFactor) +
                (property.getSecurityRating() * securityFactor);

        // Adjustments for additional features
        if (property.isHasPool()) {
            estimatedValue += poolFactor;
        }

        // Consider other amenities (e.g., gym, garden, etc.)
        // For simplicity, assume a flat rate for other amenities in KES
        estimatedValue += amenitiesFactor;

        // Apply adjustments based on built date (older properties might have a lower value)
        int currentYear = new Date().getYear() + 1900;
        int propertyYear = property.getBuiltDate().getYear() + 1900;
        int age = currentYear - propertyYear;
        estimatedValue += (age * ageFactor);

        property.setEstimatedPrice(estimatedValue); // Update the property entity with the estimated price

        return estimatedValue;
    }

    public List<Property> getPropertyListing(Long sellerId) {
        return propertyDAO.findAllBySeller_UserId(sellerId);
    }

    public List<Property> getSearchedProperties(String term) {
        return propertyDAO.getSearchedProperties(term);
    }

    public long countPropertyBySeller(Long sellerId) {
        return propertyDAO.countBySeller_UserId(sellerId);
    }
}
