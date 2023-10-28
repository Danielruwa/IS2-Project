package com.worthwise.service;

import com.worthwise.dao.PropertyDAO;
import com.worthwise.entities.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        // Add validation logic if needed
        return propertyDAO.save(property);
    }

    public Property updateProperty(Long propertyId, Property updatedProperty) {
        Property existingProperty = propertyDAO.findById(propertyId).orElse(null);
        if (existingProperty != null) {
            // Update existingProperty properties with updatedProperty properties
            // Add validation logic if needed
            return propertyDAO.save(existingProperty);
        }
        return null; // Property not found
    }

    public void deleteProperty(Long propertyId) {
        propertyDAO.deleteById(propertyId);
    }

    public double estimateValue(Property property) {
        return 0.0d;
    }
}
