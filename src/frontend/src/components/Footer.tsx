import React from 'react';
import { Link } from 'react-router-dom';
import Facebook from '../assets/facebook.png'
import Twitter from '../assets/twitter.png'
const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
                <div className="footer-logo">
                    <Link to="/">
                        Worthwise
                    </Link>
                </div>
                <div className="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={Facebook} alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={Twitter} alt="Twitter" />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Worthwise | All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
