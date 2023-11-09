import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import {SERVER_URL} from "../utils/Util";

const RegistrationForm: React.FC = () => {
    document.title = "Register";

    const submitBtn: any = useRef(null);
    const loaderAnim: any = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData]: any = useState({
        "name": "",
        "email": "",
        "password": "",
        "phoneNumber": "",
        "profilePhotoUrl": "",
        "role": "BUYER"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitBtn.current.disabled = true;
        submitBtn.current.classList.add("disabledSubmit")
        loaderAnim.current.classList.remove("hidden")

        const redirectURL = localStorage.getItem("redirectURL");

        const register = async (): Promise<any> => {

            console.log(formData)
            const registerResponse: any = await fetch(SERVER_URL + "register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res => {
                console.log(res)
                try {
                    return res.json();
                } catch (err: any) {
                    NotificationManager.error("Error: " + err.message)
                }
            });

            if (registerResponse.id) {
                NotificationManager.success("Registration Successful, now trying to login");
                navigate("/login");
            } else {
                NotificationManager.error("Could not Register user!")
            }

        }

        submitBtn.current.classList.remove("disabledSubmit");
        submitBtn.current.disabled = false;
        loaderAnim.current.classList.add("hidden");

        register().catch(() => {
            NotificationManager.error("An error occurred!")
        })
    };

    const handleUserTypeChange = (e: any) => {
        if (e.target.checked) {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-container wider">
                    <div className="title">Register Account</div>

                    <div className="logo">
                        <span>WorthWise</span>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="radio-group">
                            <div className="radio">
                                <div className="label">Seller</div>
                                <input type="radio" name="role" value="SELLER" onClick={handleUserTypeChange}/>
                            </div>
                            <div className="radio">
                                <div className="label">Buyer</div>
                                <input defaultChecked={true} type="radio" name="role" value="BUYER"
                                       onClick={handleUserTypeChange}/>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="label">Full Name <span className="required">*</span></div>
                            <input type="text" id="name" name="name" value={formData.name}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="input-field">
                            <div className="label">Email <span className="required">*</span></div>
                            <input type="email" id="email" name="email" value={formData.email}
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
