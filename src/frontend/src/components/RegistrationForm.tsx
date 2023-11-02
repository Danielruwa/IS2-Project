import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";

const RegistrationForm: React.FC = () => {
    document.title = "Register";
    const [formData, setFormData] = useState(
        {name: '', email: '', phoneNumber: '', role: 'buyer', password: ''}
    );
    const submitBtn: any = useRef(null);
    const loaderAnim: any = useRef(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData)
    };

    const handleUserTypeChange = (e: any) => {
        if (e.target.checked) {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="title">Register Account</div>

                    <div className="logo">
                        <span>WorthWise</span>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="radio-group">
                            <div className="radio">
                                <div className="label">Seller</div>
                                <input type="radio" name="role" value="seller" onClick={handleUserTypeChange}/>
                            </div>
                            <div className="radio">
                                <div className="label">Buyer</div>
                                <input defaultChecked={true} type="radio" name="role" value="buyer"
                                       onClick={handleUserTypeChange}/>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="label">Email <span className="required">*</span></div>
                            <input type="email" id="email" name="email" value={formData.email}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="input-field">
                            <div className="label">Full Name <span className="required">*</span></div>
                            <input type="text" id="name" name="name" value={formData.name}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="input-field">
                            <div className="label">Phone <span className="required">*</span></div>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="input-field">
                            <div className="label">Password <span className="required">*</span></div>
                            <input pattern={formData.password} type="password" id="password" name="password" value={formData.password}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="button-wrapper">
                            <button ref={submitBtn} type="submit" className="submit">
                                <span>Register</span>
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
                        <Link to="/login">Login</Link>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default RegistrationForm;
