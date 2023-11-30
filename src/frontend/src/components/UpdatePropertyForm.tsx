import React, { useState, useEffect, useRef } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import TopNav from "./TopNav";
import Util, { SERVER_URL } from "../utils/Util";
import Footer from "./Footer";

const UpdatePropertyForm: React.FC = () => {
    document.title = 'Update Property';

    const { id }: any = useParams();
    const navigate = useNavigate();

    const [property, setProperty]: any = useState({
        name: "",
        description: "",
        sizeInSqft: 0,
        rooms: 0,
        location: '',
        garages: 0,
        otherAmenities: '',
        securityRating: 0,
        image: null
    });

    const submitBtn: any = useRef(null);
    const loaderAnim: any = useRef(null);

    const handlePicChange = (e: any) => {
        const file = e.target.files[0];
        // Validate if the selected file is an image
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setProperty({ ...property, image: file });
            };
            reader.readAsDataURL(file);
        } else {
            NotificationManager.warning('Please select a valid image file.');
        }
    };

    useEffect(() => {
        // Fetch property details based on the ID from the URL
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`${SERVER_URL}property/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                } else {
                    // Handle error
                    NotificationManager.error('Failed to fetch property details');
                }
            } catch (error) {
                console.error('Error:', error);
                NotificationManager.error('An error occurred while fetching property details');
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleChange = (e: any) => {
            setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        submitBtn.current.disabled = true;
        submitBtn.current.classList.add('disabledSubmit');
        loaderAnim.current.classList.remove('hidden');

        try {
            const formData = new FormData();
            formData.append('name', property.name);
            formData.append('description', property.description);
            formData.append('sizeInSqft', property.sizeInSqft);
            formData.append('rooms', property.rooms);
            formData.append('location', property.location);
            formData.append('garages', property.garages);
            formData.append('otherAmenities', property.otherAmenities);
            formData.append('securityRating', property.securityRating);
            if (property.image) {
                formData.append('image', property.image);
            }

            const response = await fetch(`${SERVER_URL}property/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: formData,
            });

            if (response.ok) {
                NotificationManager.success('Property updated successfully');
                navigate("/my-list")
            } else {
                // Handle error
                const errorData = await response.json();
                NotificationManager.error('Error: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            NotificationManager.error('An error occurred!');
        }

        submitBtn.current.classList.remove('disabledSubmit');
        submitBtn.current.disabled = false;
        loaderAnim.current.classList.add('hidden');
    };

    return (
        <>
            <TopNav />
            <div className="">
                    <div className="add-property">
                        <div className="window-title">Update Property</div>

                        <form className="form" onSubmit={handleSubmit}>

                            <div className="input-field">
                                <div className="label">Name</div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={property.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="input-field">
                                <div className="label">Description</div>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={property.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="input-field">
                                <div className="label">Size in Sqft</div>
                                <input
                                    type="number"
                                    id="sizeInSqft"
                                    name="sizeInSqft"
                                    value={property.sizeInSqft}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Number of Rooms</div>
                                <input
                                    type="number"
                                    id="rooms"
                                    name="rooms"
                                    value={property.rooms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Location</div>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={property.location}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* ... Other fields remain unchanged ... */}
                            <div className="input-field">
                                <div className="label">Number of Garages</div>
                                <input
                                    type="number"
                                    id="garages"
                                    name="garages"
                                    value={property.garages}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Other Amenities</div>
                                <input
                                    type="text"
                                    id="otherAmenities"
                                    name="otherAmenities"
                                    value={property.otherAmenities}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Security Rating</div>
                                <input
                                    type="number"
                                    id="securityRating"
                                    name="securityRating"
                                    value={property.securityRating}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Image</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePicChange}
                                    className="input-field"
                                />
                            </div>
                            <div className="button-wrapper">
                                <button type="submit" ref={submitBtn} className="submit">
                                    <span>Update Property</span>
                                    <div ref={loaderAnim} className="loader hidden">
                                        <div className="bar"></div>
                                        <div className="bar"></div>
                                        <div className="bar"></div>
                                        <div className="bar"></div>
                                    </div>
                                </button>
                            </div>
                        </form>

                        <div className="other-links">
                            <Link to="/">Back to Home</Link>
                        </div>
                    </div>
            </div>

            <Footer />
        </>
    );

};

export default UpdatePropertyForm;
