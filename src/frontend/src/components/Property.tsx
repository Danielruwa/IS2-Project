import React, { useState, useEffect } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import TopNav from './TopNav';
import { NotificationManager } from 'react-notifications';
import Util, { SERVER_URL } from '../utils/Util';

const Property = () => {
    const { id } = useParams();
    const [property, setProperty]: any = useState({});
    const [user, setUser]: any = useState(JSON.parse(localStorage.getItem('user') ?? '{}'));
    const [isPropertyCreater, setIsPropertyCreater] : any = useState(false);
    const util = new Util();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchProperty = async () => {
            try {
                const response = await fetch(SERVER_URL + `property/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                } else {
                    NotificationManager.error('Failed to fetch property details');
                }
            } catch (error) {
                console.error('Error:', error);
                NotificationManager.error('An error occurred while fetching property details');
            }
        };

        fetchProperty();

        setIsPropertyCreater(user.userId === property.seller?.userId);
    }, []);

    const handleAddToFavorites = () => {

    }

    const handleDeleteProperty = async (id: any) => {
        const confirmation = window.confirm("Are you sure you want to delete this item?");

        if (confirmation) {
            try {
                const response = await fetch(SERVER_URL + `property/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.accessToken}`
                    },
                });

                if (response.ok) {
                    NotificationManager.success("You have successfully deleted this item.");
                    navigate("/my-list");
                } else {
                    const errorData = await response.json();
                    NotificationManager.warning(`Could not delete product: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                NotificationManager.error('An error occurred while deleting the item.');
            }
        } else {
            NotificationManager.warning("Deletion canceled.");
        }
    };

    return (
        <>
            <TopNav />
            <div className="property-details-wrapper">
                <div className="property-details-content">
                    {property.image && (
                        <img
                            src={property.image ? `data:image/jpeg;base64, ${property.image}` : ""}
                            alt="Property Image"
                            className="image"
                        />
                    )}

                    <h2>{property.name}</h2>
                    <p>{property.description}</p>
                    <p>{property.location}</p>
                    <p>Built Date: {util.formatDate(property.builtDate)}</p>
                    <p>Rooms: {property.rooms}</p>
                    <p>Garages: {property.garages}</p>
                    <p>Other Amenities: {property.otherAmenities}</p>
                    <p>Security Rating: {property.securityRating}</p>

                    <div className="creation-details">
                        <p>Created by: {property.seller && property.seller.name}</p>
                    </div>

                    <div className="buttons">


                    {user.userId ? (
                        isPropertyCreater ? (
                            // Buttons for the property creator
                            <>
                                <Link to={`/update-property/${id}`}>
                                    <button className="submit">Update Property</button>
                                </Link>
                                <button className="btn-delete" onClick={() => handleDeleteProperty(id)}>Delete Property</button>
                            </>
                        ) : (
                            // Buttons for non-creator registered user
                            <button className="btn-add" onClick={handleAddToFavorites}>Add to Favorites</button>
                        )
                    ) : null}

                    <Link to={`/estimate?id=${property.propertyId}`}>
                        <button className="btn-create">
                            Estimate Value
                        </button>
                    </Link>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Property;
