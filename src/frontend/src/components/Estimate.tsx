import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import TopNav from './TopNav';

const Estimate = () => {
    const {id} = useParams(); // Get the ID from the URL path parameter
    const [property, setProperty]: any = useState({
        sizeInSqft: 0,
        rooms: 0,
        location: '',
        price: 0,
        builtDate: '',
        garages: 0,
        hasPool: false,
        otherAmenities: '',
        securityRating: 0,
    });

    // Fetch property details if ID is provided in the URL
    useEffect(() => {
        if (id) {
            // Implement logic to fetch property details by ID from the backend
            // Example API call:
            // fetch(`/api/properties/${id}`)
            //   .then((response) => response.json())
            //   .then((data) => setProperty(data))
            //   .catch((error) => console.error(error));
        }
    }, [id]);

    // Function to estimate property value
    const estimateValue = () => {
        // Implement logic to estimate property value based on the provided fields
        // You can use the same logic as in your Java code
        // Example API call to send property object to the backend for estimation:
        // fetch('/api/properties/estimate', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(property),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // Handle estimated value response from the backend
        //     console.log('Estimated Value:', data.estimatedValue);
        //   })
        //   .catch((error) => console.error(error));
    };

    return (
        <>
            <TopNav/>
            <div className="estimate-content">
                <h2>Property Estimate</h2>
                <div className="input-group">
                    <label>Size (sqft):</label>
                    <input
                        type="number"
                        value={property.sizeInSqft}
                        onChange={(e) => setProperty({...property, sizeInSqft: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Number of Rooms:</label>
                    <input
                        type="number"
                        value={property.rooms}
                        onChange={(e) => setProperty({...property, rooms: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        value={property.location}
                        onChange={(e) => setProperty({...property, location: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Built Date:</label>
                    <input
                        type="date"
                        value={property.builtDate}
                        onChange={(e) => setProperty({...property, builtDate: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Number of Garages:</label>
                    <input
                        type="number"
                        value={property.garages}
                        onChange={(e) => setProperty({...property, garages: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Has Pool:</label>
                    <input
                        type="checkbox"
                        checked={property.hasPool}
                        onChange={(e) => setProperty({...property, hasPool: e.target.checked})}
                    />
                </div>
                <div className="input-group">
                    <label>Other Amenities:</label>
                    <textarea
                        value={property.otherAmenities}
                        onChange={(e) => setProperty({...property, otherAmenities: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Security Rating:</label>
                    <select value={property.securityRating}
                            onChange={(e) => setProperty({...property, securityRating: e.target.value})}>
                        <option value={0}>None</option>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>


                    </select>
                </div>

                <button onClick={estimateValue}>Estimate Property Value</button>
                {property.estimatedPrice && <p>Estimated Value: {property.estimatedPrice}</p>}
            </div>
        </>
    );
};

export default Estimate;
