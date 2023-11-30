import React, {useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import TopNav from "./TopNav";
import Util, {SERVER_URL} from "../utils/Util";
import Footer from "./Footer";

const AddPropertyForm = (): React.ReactElement => {
    document.title = 'Add Property';

    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const navigate = useNavigate();

    const [property, setProperty]: any = useState({
        name: "",
        description: "",
        sizeInSqft: 0,
        rooms: 0,
        location: '',
        price: 0,
        builtDate: "",
        garages: 0,
        hasPool: false,
        otherAmenities: '',
        securityRating: 0,
        estimatedPrice: 0,
        seller: user.userId,
        image: null
    });

    const submitBtn: any = useRef(null);
    const loaderAnim: any = useRef(null);

    const handleChange = (e: any) => {
        if (e.target.name === "hasPool") {
            setProperty({ ...property, hasPool: e.target.checked });
        } else {
            setProperty({ ...property, [e.target.name]: e.target.value });
        }
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        submitBtn.current.disabled = true;
        submitBtn.current.classList.add('disabledSubmit');
        loaderAnim.current.classList.remove('hidden');

        try {

            console.log("Property: ", property);
            const formData = new FormData();
            formData.append('name', property.name);
            formData.append('description', property.description);
            formData.append('sizeInSqft', property.sizeInSqft);
            formData.append('rooms', property.rooms);
            formData.append('location', property.location);
            formData.append('price', property.price);
            formData.append('builtDate', property.builtDate);
            formData.append('garages', property.garages);
            formData.append('hasPool', property.hasPool);
            formData.append('otherAmenities', property.otherAmenities);
            formData.append('securityRating', property.securityRating);
            formData.append('estimatedPrice', property.estimatedPrice);
            formData.append('seller', property.seller);
            if (property.image) {
                formData.append('image', property.image);
            }


            const response = await fetch(SERVER_URL + 'property/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: formData,
            });

            if (response.ok) {
                NotificationManager.success('Property added successfully');
                navigate("/my-list")
            } else {
                // Handle error
                const errorData = await response.json();
                console.log(errorData);
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
            <TopNav/>
            <div className="">
                    <div className="add-property">
                        <div className="window-title">Add Property</div>

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="input-field">
                                <div className="label">Name</div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={property.name}
                                    required={true}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="input-field">
                                <div className="label">Description</div>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={property.description}
                                    required={true}
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
                                    required={true}
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
                                    required={true}
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
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Price</div>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={property.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Built Date</div>
                                <input
                                    type="date"
                                    id="builtDate"
                                    name="builtDate"
                                    value={property.builtDate}
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Number of Garages</div>
                                <input
                                    type="number"
                                    id="garages"
                                    name="garages"
                                    value={property.garages}
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Has Pool</div>
                                <input
                                    type="checkbox"
                                    id="hasPool"
                                    name="hasPool"
                                    checked={property.hasPool}
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
                                    required={true}
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
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="label">Estimated Price</div>
                                <input
                                    type="number"
                                    id="estimatedPrice"
                                    name="estimatedPrice"
                                    value={property.estimatedPrice}
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
                                    <span>Add Property</span>
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

export default AddPropertyForm;
