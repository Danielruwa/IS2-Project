import TopNav from "./TopNav";
import {NotificationManager} from "react-notifications";
import Util, {SERVER_URL} from "../utils/Util";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Close from "../assets/close.png"
import Footer from "./Footer";

export default function MyList() {

    document.title = "My Properties";
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    let orgId: string | null = "";
    const menuToOpen: any = useRef();

    const navigate = useNavigate()
    const [properties, setProperties] = useState([]);

    useEffect(() => {

        const fetchProperties = async () => {
            try {
                const response = await fetch(SERVER_URL + 'property/listing/' + user.userId, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProperties(data);
                } else {
                    // Handle error
                    NotificationManager.error('Failed to fetch properties');
                }
            } catch (error) {
                console.error('Error:', error);
                NotificationManager.error('An error occurred while fetching properties');
            }
        };

        fetchProperties();

    }, [orgId]);

    const handleSelect = (property: any) => {
        navigate(`/property/${property.propertyId}`);
    }


    return (
        <>
            <TopNav/>
            <div className="facility-wrapper">
                <div className="filter-wrapper">
                    <div className="left">

                    </div>
                    <div className="right">
                        <div className="window-title">
                            My Lists
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    <div className="main-window-side-nav">

                    </div>
                    <div className="content-wrapper">
                        <div className="top">
                            <div className="title">
                                My Property Listings
                            </div>
                            <div className="size">
                                {properties.length} facilities
                            </div>
                        </div>

                        <div className="list">
                            {
                                properties.length && properties.filter((prop: any) => true).map((property: any, index: number) => (
                                    <div key={index} onClick={() => handleSelect(property)}
                                         className="facility">
                                        <div className="name">
                                            {property.name}
                                        </div>
                                        <div className="details">
                                            {property.description}
                                        </div>
                                        <div className="size">
                                            <div>Rooms: {property.rooms}</div>
                                            <div>Garages: {property.garages}</div>
                                            <div>{property.otherAmenities}</div>
                                        </div>

                                        <div className="creation-details">
                                            {`${property.location}  Created By: ${property.seller.name}`}
                                        </div>

                                        <Link className="btn-create" to={`/estimate?id=${property.propertyId}`}>Estimate Value</Link>

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
    )
}