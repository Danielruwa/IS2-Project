// ContactPage.js

import React, { useState } from 'react';
import TopNav from './TopNav';
import Footer from './Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Submitted:', formData);
    };

    return (
        <div className="contact-page">
            <TopNav />
            <div className="add-property">
                <h2>Contact Us</h2>
                <p>
                    Have a question or feedback? Reach out to us by filling out the form below,
                    and we'll get back to you as soon as possible.
                </p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <div className="label">Your Name</div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <div className="label">Your Email</div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <div className="label">Your Message</div>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-wrapper">
                        <button type="submit" className="submit">
                            <span>Send Message</span>
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
