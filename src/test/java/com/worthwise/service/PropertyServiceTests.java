package com.worthwise.service;

import com.worthwise.entities.Property;
import com.worthwise.dao.PropertyDAO;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PropertyServiceTests {

    @Mock
    private PropertyDAO propertyDAO;

    @InjectMocks
    private PropertyService propertyService;

    @Test
    public void testGetAllProperties() {
        when(propertyDAO.findAll()).thenReturn(List.of(new Property(), new Property()));
        assertEquals(2, propertyService.getAllProperties().size());
    }

    @Test
    public void testGetPropertyById() {
        Property property = new Property();
        property.setPropertyId(1L);
        when(propertyDAO.findById(1L)).thenReturn(Optional.of(property));
        assertEquals(1L, propertyService.getPropertyById(1L).getPropertyId());
    }

    @Test
    public void testCreateProperty() {
        Property property = new Property();
        when(propertyDAO.save(property)).thenReturn(property);
        assertEquals(property, propertyService.createProperty(property));
    }

    @Test
    public void testUpdateProperty() {
        Property existingProperty = new Property();
        existingProperty.setPropertyId(1L);
        Property updatedProperty = new Property();
        updatedProperty.setPropertyId(1L);
        when(propertyDAO.findById(1L)).thenReturn(Optional.of(existingProperty));
        when(propertyDAO.save(existingProperty)).thenReturn(updatedProperty);
        assertEquals(updatedProperty, propertyService.updateProperty(1L, updatedProperty));
    }

    @Test
    public void testUpdateNonExistingProperty() {
        when(propertyDAO.findById(1L)).thenReturn(Optional.empty());
        assertNull(propertyService.updateProperty(1L, new Property()));
    }

    @Test
    public void testDeleteProperty() {
        propertyService.deleteProperty(1L);
        verify(propertyDAO, times(1)).deleteById(1L);
    }

    @Test
    public void testEstimateValue() {
        Property property = new Property(2000, 4, "Nairobi", 0, new Date(), 2, true, "Garden", 7, 0);
        double estimatedValue = propertyService.estimateValue(property);
        assertEquals(7450000.0, estimatedValue);
    }

    @Test
    public void testEstimatedValue() {
        Property property1 = new Property(2000, 4, "Nairobi", 0, new Date(), 2, true, "Garden", 7, 0);
        double estimatedValue1 = propertyService.estimateValue(property1);
        assertEquals(estimatedValue1, 7450000.0, "Estimated value for property1 is incorrect");

        Property property2 = new Property(1500, 3, "Mombasa", 0, new Date(), 1, false, "Gym", 5, 0);
        double estimatedValue2 = propertyService.estimateValue(property2);
        assertEquals(estimatedValue2, 5900000.0, "Estimated value for property2 is incorrect");

        Property property3 = new Property(2500, 5, "Kisumu", 0, new Date(), 3, true, "Garden, Pool", 8, 0);
        double estimatedValue3 = propertyService.estimateValue(property3);
        assertEquals(estimatedValue3, 8750000.0, "Estimated value for property3 is incorrect");

        Property property4 = new Property(1800, 4, "Eldoret", 0, new Date(), 2, false, "Garden", 6, 0);
        double estimatedValue4 = propertyService.estimateValue(property4);
        assertEquals(estimatedValue4, 6800000.0, "Estimated value for property4 is incorrect");

        Property property5 = new Property(2200, 6, "Nakuru", 0, new Date(), 2, true, "Garden, Pool, Gym", 9, 0);
        double estimatedValue5 = propertyService.estimateValue(property5);
        assertEquals(estimatedValue5, 8250000.0, "Estimated value for property5 is incorrect");
    }

}
