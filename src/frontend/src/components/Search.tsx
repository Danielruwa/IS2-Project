import TopNav from "./TopNav";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../utils/Util";
import {NotificationManager} from "react-notifications";

export default function Search() {

    document.title = "Search";

    const [searchTerm, setSearchTerm] = useState("");

    const param = new URLSearchParams(window.location.search);

    useEffect(() => {
        setSearchTerm(param.get("value") ?? "null");
    })

    const navigate = useNavigate()
    const [properties, setProperties] = useState([]);

    const fetchProperties = async () => {
        try {
            const response = await fetch(`${SERVER_URL}property/search?term=${searchTerm}`);
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

    useEffect(() => {

        fetchProperties();

    }, []);

    const handleSelect = (property: any) => {
        navigate(`/property/${property.propertyId}`);
    }

    return (
        <>
            <TopNav/>

            <div className="facility-wrapper">
                <div className="filter-wrapper">
                    <div className="left">
                        {/*todo: make this part interesting*/}
                        <form className="search-form" onSubmit={fetchProperties}>
                            <input required onChange={(e: any) => setSearchTerm(e.target.value)} name="value" type="search" className="search-box"/>
                            <button onSubmit={fetchProperties} type={"submit"}>Search</button>
                        </form>
                    </div>
                    <div className="right">
                        <div className="window-title">
                            Search Results
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    <div className="main-window-side-nav">

                    </div>
                    <div className="content-wrapper">
                        <div className="top">
                            <div className="title">
                                Search Results
                            </div>
                            <div className="size">
                                {properties.length} properties
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
                                            {property.location}
                                        </div>
                                        <div className="creation-details">
                                            Created
                                            by: {property.seller.name}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="copy count-value">
                            &copy; {new Date().getFullYear()} | Eikal
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}