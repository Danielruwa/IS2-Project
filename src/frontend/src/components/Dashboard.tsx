import React, {useEffect, useState} from "react";
import TopNav from "./TopNav";
import {Link} from "react-router-dom";
import {SERVER_URL} from "../utils/Util";
import {NotificationManager} from "react-notifications";

export default function Dashboard() {
    const [propertyCount, setPropertyCount]: any = useState(null);
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");

    // Fetch property details if ID is provided in the URL
    useEffect(() => {
        fetchCount();
    }, []);

    const fetchCount = () => {

        fetch(SERVER_URL + 'property/count?sellerId=' + user.userId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.accessToken}`
            }})
            .then((response) => response.json())
            .then((data) => {
                setPropertyCount(!data.error ? data : 0.0);
            })
            .catch((error) => {
                setPropertyCount(0.0);
                NotificationManager.error("Error: " + error)
            });
    };
    return (
        <>
            <TopNav />
            <div className="dashboard-container">
                <Link to={"/my-list"} className="dashboard-tile">
                    <h3>My Properties</h3>
                    <p>View and manage your {propertyCount} listed properties</p>
                </Link>
                <Link to={"/estimate"} className="dashboard-tile">
                    <h3>Property Estimation</h3>
                    <p>Estimate the value of your properties</p>
                </Link>
                <Link to={"add-property"} className="dashboard-tile">
                    <h3>Add Property</h3>
                    <p>Add new properties to your collection</p>
                </Link>

                <div className="dashboard-tile">
                    <h3>Total Listed Properties</h3>
                    <h1>{propertyCount}</h1>
                </div>
                <div className="dashboard-tile">
                    <h3>view Profile</h3>
                    <p>View my profile and update changes if necessary</p>
                </div>
            </div>
        </>
    );
}
