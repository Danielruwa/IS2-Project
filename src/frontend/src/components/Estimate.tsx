import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopNav from './TopNav';
import Util, {SERVER_URL} from "../utils/Util";
import * as util from "util";
import {NotificationManager} from "react-notifications";
import Footer from "./Footer";

const Estimate = () => {
    const util: Util = new Util();
    const params = new URLSearchParams(window.location.search);
    const [id, setId]: any = useState(0); // Get the ID from the URL path parameter
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
    const [estimatedPrice, setEstimatedPrice]: any = useState(null);

    // Fetch property details if ID is provided in the URL
    useEffect(() => {

        setId(params.get("id") ?? 0);

        const fetchPropertyDetails = async () => {
            if (id) {
                try {
                    const response = await fetch(SERVER_URL + `property/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setProperty(data);
                    } else {
                        console.error('Failed to fetch property details');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchPropertyDetails();
    }, [id]);

    // Function to estimate property value
    const estimateValue = () => {

        fetch(SERVER_URL + 'property/estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        })
            .then((response) => response.json())
            .then((data) => {
                setEstimatedPrice(!data.error ? data : 0.0);
            })
            .catch((error) => {
                setEstimatedPrice(0.0);
                NotificationManager.error("Error: " + error)
            });
    };

    return (
        <>
            <TopNav />
            <div className="estimate-content">
                <h2>Property Estimate - {property.name}</h2>

                <div className="input-group">
                    <label>Size (sqft):</label>
                    <input
                        type="number"
                        value={property.sizeInSqft}
                        onChange={(e) => setProperty({ ...property, sizeInSqft: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Number of Rooms:</label>
                    <input
                        type="number"
                        value={property.rooms}
                        onChange={(e) => setProperty({ ...property, rooms: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        value={property.location}
                        onChange={(e) => setProperty({ ...property, location: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Built Date:</label>
                    <input
                        type="date"
                        value={property.builtDate}
                        onChange={(e) => setProperty({ ...property, builtDate: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Number of Garages:</label>
                    <input
                        type="number"
                        value={property.garages}
                        onChange={(e) => setProperty({ ...property, garages: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Has Pool:</label>
                    <input
                        type="checkbox"
                        checked={property.hasPool}
                        onChange={(e) => setProperty({ ...property, hasPool: e.target.checked })}
                    />
                </div>
                <div className="input-group">
                    <label>Other Amenities:</label>
                    <textarea
                        value={property.otherAmenities}
                        onChange={(e) => setProperty({ ...property, otherAmenities: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Security Rating (1-10):</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={property.securityRating}
                        onChange={(e) => setProperty({ ...property, securityRating: e.target.value })}
                    />
                </div>
                <button className="btn-add" onClick={estimateValue}>Estimate Property Value</button>
                {estimatedPrice !== null && <p>Estimated Value: <div className="window-title">{util.formatMoney(estimatedPrice)}</div></p>}

            </div>

            <Footer />
        </>
    );
};

export default Estimate;
