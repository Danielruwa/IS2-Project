import TopNav from "./TopNav";
import { NotificationManager } from "react-notifications";
import Util, { SERVER_URL } from "../utils/Util";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Favorites() {
    document.title = "My Favorites";
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const [favorites, setFavorites]:any = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(SERVER_URL + `property/user/favorites/${user.userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.accessToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data);
                } else {
                    // Handle error
                    NotificationManager.error("Failed to fetch favorite properties");
                }
            } catch (error) {
                console.error("Error:", error);
                NotificationManager.error("An error occurred while fetching favorite properties");
            }
        };

        fetchFavorites();
    }, [user.userId]);

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
                if(data === "added") {
                    NotificationManager.success("Added property to favorites");
                } else {
                    NotificationManager.warning("Removed property from favorites")
                }

            })
            .catch((error) => {
                NotificationManager.error(error);
            });
    };

    return (
        <>
            <TopNav />
            <div className="facility-wrapper">
                <div className="filter-wrapper">
                    <div className="left"></div>
                    <div className="right">
                        <div className="window-title">My Favorites</div>
                    </div>
                </div>
                <div className="main-content">
                    <div className="content-wrapper">
                        <div className="top">
                            <div className="title">My Favorite Properties</div>
                            <div className="size">{favorites.length} properties</div>
                        </div>

                        <div className="list">
                            {favorites.length &&
                                favorites.map((property: any, index: number) => (
                                    <div key={index} className="facility">
                                        <div className="name">{property.name}</div>
                                        <div className="details">{property.description}</div>
                                        <div className="size">
                                            <div>Rooms: {property.rooms}</div>
                                            <div>Garages: {property.garages}</div>
                                            <div>{property.otherAmenities}</div>
                                        </div>
                                        <div className="creation-details">
                                            {`${property.location} | Created By: ${property.seller.name}`}
                                        </div>
                                        <div className="button-wrapper">
                                            <Link className="btn-create" to={`/estimate?id=${property.propertyId}`}>Estimate Value</Link>
                                            <button className="btn-cancel" onClick={() => addToFavorites(property.propertyId)}>
                                                Remove From Favorites
                                            </button>
                                        </div>

                                    </div>
                                ))}
                        </div>

                        <div className="copy count-value">
                            &copy; {new Date().getFullYear()} | Worthwise
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
