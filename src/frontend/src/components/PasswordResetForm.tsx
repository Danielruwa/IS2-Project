import React, { useState } from 'react';

interface PasswordResetFormProps {
    onSubmit: (formData: { email: string; newPassword: string }) => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ email: '', newPassword: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div>
            <h2>Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />

                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleInputChange} required /><br />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordResetForm;
