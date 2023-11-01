import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required /><br />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
