import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import TopNav, { Search } from './TopNav';
import {SERVER_URL} from "../utils/Util";

const Home = () => {
    const [properties, setProperties]: any = useState([]);
    const [userRole, setUserRole] = useState(''); // 'BUYER' or other roles
    const [favorites, setFavorites]: any = useState([]);
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");

    useEffect(() => {
        // Fetch properties from the backend
        const fetchProperties = async () => {
            try {
                const response = await fetch(SERVER_URL + 'property/all', {

                }); // Replace with your backend URL
                if (response.ok) {
                    const data = await response.json();
                    setProperties(data);
                } else {
                    // Handle error
                    NotificationManager.error('Failed to fetch properties');
                }
            } catch (error) {
                NotificationManager.error('An error occurred while fetching properties');
            }
        };

        setUserRole(user.role)

        fetchProperties();
    }, []);

    const addToFavorites = (propertyId: number) => {// /user/favorites/add
        fetch(`${SERVER_URL}property/user/favorites/add?userId=${user.userId}&propertyId=${propertyId}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        })
            .then((response) => {
                if (!response.ok) {
                    NotificationManager.error('Error adding property to favorites');
                }
                return response.text();
            })
            .then((data) => {
                NotificationManager.success(data)
            })
            .catch((error) => {
                NotificationManager.error(error);
            });
    };


    return (
        <>
            <TopNav />
            <Search />
            <div className="property-list-container">
                <h2 className="property-list-title">Properties</h2>
                <div className="property-list">
                    {properties.map((property: any) => (
                        <div className="property-item" key={property.propertyId}>
                            <div className="property-details">
                                <Link to={`/property/${property.propertyId}`}>
                                    <img className="property-image" src={`data:image/jpeg;base64,${property.image}`} alt={property.name} />
                                    <p className="property-name">{property.name}</p>
                                    <p className="property-description">{property.description}</p>
                                </Link>
                                <p className="property-location">{property.location}</p>
                                <p className="property-info">Price: ${property.price}</p>
                                <p className="property-info">Size: {property.sizeInSqft} sqft</p>

                                {userRole === 'BUYER' && (
                                    <button className="add-to-favorites" onClick={() => addToFavorites(property.propertyId)}>
                                        Add to Favorites
                                    </button>
                                )}

                                <Link className="estimate-link" to={`/estimate?id=${property.propertyId}`}>
                                    Estimate Value
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Home;
