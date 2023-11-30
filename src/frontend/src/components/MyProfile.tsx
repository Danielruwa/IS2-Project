import React, { useState } from 'react';
import TopNav from './TopNav';
import Util, {SERVER_URL} from "../utils/Util";
import {NotificationManager} from "react-notifications";
import Footer from "./Footer";

const MyProfile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ?? "{}"));
    const util: Util = new Util();
    const [profilePicFile, setProfilePicFile] = useState(null);


    const handleSaveChanges = () => {
        if (profilePicFile) {
            const img = new Image();
            img.src = URL.createObjectURL(profilePicFile);

            img.onload = () => {
                if (img.width !== img.height) {
                    NotificationManager.error('Profile picture must be a square. Please choose another image.');
                    return;
                }
                updateProfile();
            };
        } else {
            updateProfile();
        }
    };

    const updateProfile = () => {
        localStorage.setItem('user', JSON.stringify(user));


        const formData = new FormData();

        // Add user details
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phoneNumber', user.phoneNumber);

        // Add profile picture if available
        if (profilePicFile) {
            formData.append('profilePicture', profilePicFile);
        }

        console.log(profilePicFile)

        // Send the formData to the backend API
        fetch(`${SERVER_URL}user/${user.userId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${localStorage.accessToken}`
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                NotificationManager.success("Profile updated successfully");
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data));
            })
            .catch((error) => {
                NotificationManager.error("Error updating profile: " + error);
                console.error('Error updating profile:', error);
            });
    };

    const handleProfilePicChange = (e: any) => {
        const file = e.target.files[0];
        // Validate if the selected file is an image
        if (file && file.type.startsWith('image/')) {
            setProfilePicFile(file);
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setUser({ ...user, profilePhotoUrl: e.target.result });
            };
            reader.readAsDataURL(file);
        } else {
            NotificationManager.warning('Please select a valid image file.');
        }
    };

    return (
        <>
            <TopNav />
            <div className="estimate-content">
                <h2>User Profile</h2>
                <div className="profile-pic-preview">
                    {user.profilePhoto && (
                        <img
                            src={profilePicFile ? profilePicFile : `data:image/jpeg;base64, ${user.profilePhoto}`}
                            alt="Profile"
                            className="profile-picture"
                        />
                    )}
                </div>
                <div className="input-group">
                    <label className="label">Profile Picture:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Phone Number:</label>
                    <input
                        type="text"
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Date Created:</label>
                    <input type={"text"} disabled={true} className="readonly-field" value={util.formatDate(user.dateCreated)}/>
                </div>
                <div className="input-group">
                    <label className="label">Role:</label>
                    <input type={"text"} disabled={true} className="readonly-field" value={user.role}/>

                </div>
                <button onClick={handleSaveChanges} className="btn-add">
                    Save Changes
                </button>
            </div>

            <Footer />
        </>
    );
};

export default MyProfile;
