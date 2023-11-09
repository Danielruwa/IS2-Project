import React, { useState } from 'react';
import TopNav from './TopNav';
import Util from "../utils/Util";

const MyProfile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ?? "{}"));
    const util: Util = new Util();

    const handleSaveChanges = () => {
        // Implement logic to save changes to localStorage or backend
        localStorage.setItem('user', JSON.stringify(user));
        // Display a success message or perform any necessary actions after saving the changes
        console.log('Changes saved successfully!');
    };

    const handleProfilePicChange = (e: any) => {
        // Handle profile picture upload logic here
        // Update user.profilePhotoUrl with the uploaded image URL
    };

    return (
        <>
            <TopNav />
            <div className="profile-content">
                <h2>User Profile</h2>
                <div className="input-group">
                    <div className="label">Profile Picture:</div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProfilePicChange(e)}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <div className="label">Name:</div>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <div className="label">Email:</div>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <div className="label">Phone Number:</div>
                    <input
                        type="text"
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <div className="label">Date Created:</div>
                    <span className="readonly-field">{util.formatDate(user.dateCreated)}</span>
                </div>
                <div className="input-group">
                    <div className="label">Role:</div>
                    <span className="readonly-field">{user.role}</span>
                </div>
                <button onClick={handleSaveChanges} className="save-button">
                    Save Changes
                </button>
            </div>
        </>
    );
};

export default MyProfile;
