import TopNav from "./TopNav";
import React, {useState} from "react";

export default function AddProperty() {
    return (
        <>
            <TopNav />
            <AddPropertyForm />
        </>

    )
}

const AddPropertyForm = (): React.ReactElement => {
    const [property, setProperty]: any = useState({
        sizeInSqft: 0,
        rooms: 0,
        location: '',
        price: 0,
        builtDate: new Date(),
        garages: 0,
        hasPool: false,
        otherAmenities: '',
        securityRating: 0,
        estimatedPrice: 0,
    });

    const handleChange = (e: any) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // TODO: Implement logic to send the property data to the backend for creation
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="sizeInSqft"
                value={property.sizeInSqft}
                onChange={handleChange}
                placeholder="Size (sqft)"
            />
            <input
                type="number"
                name="rooms"
                value={property.rooms}
                onChange={handleChange}
                placeholder="Number of Rooms"
            />
            <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                placeholder="Location"
            />
            <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                placeholder="Price"
            />
            <input
                type="date"
                name="builtDate"
                value={property.builtDate}
                onChange={handleChange}
            />
            <input
                type="number"
                name="garages"
                value={property.garages}
                onChange={handleChange}
                placeholder="Number of Garages"
            />
            <input
                type="checkbox"
                name="hasPool"
                checked={property.hasPool}
                onChange={handleChange}
            />
            <textarea
                name="otherAmenities"
                value={property.otherAmenities}
                onChange={handleChange}
                placeholder="Other Amenities"
            />
            <select name="securityRating" value={property.securityRating} onChange={handleChange}>
                <option value="0">None</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>

            <button type="submit">Add Property</button>
        </form>
    );
};
