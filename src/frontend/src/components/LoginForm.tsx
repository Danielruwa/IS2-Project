import React, {useRef, useState} from 'react';
import "../styles/auth-style.css"
import {Link} from "react-router-dom";

const LoginForm: React.FC = () => {
    document.title = "Login";

    const [formData, setFormData] = useState({email: '', password: ''});
    const submitBtn: any = useRef(null);
    const loaderAnim: any = useRef(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitBtn.current.disabled = true;
        submitBtn.current.classList.add("disabledSubmit")
        loaderAnim.current.classList.remove("hidden")

        const redirectURL = localStorage.getItem("redirectURL");
        const params = new URLSearchParams();
        params.append("email", formData.email);
        params.append("password", formData.password);

        window.alert("TODO: 2nd, Nov")
        const login = async (): Promise<any> => {
            // TODO: Perform login action
        }

    };

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="title">Login</div>

                    <div className="logo">
                        <span>WorthWise</span>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <div className="label">Email <span className="required">*</span></div>
                            <input type="email" id="email" name="email" value={formData.email}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="input-field">
                            <div className="label">Password <span className="required">*</span></div>
                            <input type="password" id="password" name="password" value={formData.password}
                                   onChange={handleInputChange} required/>
                        </div>

                        <div className="button-wrapper">
                            <button ref={submitBtn} type="submit" className="submit">
                                <span>Login</span>
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
                        <Link to="/register">Register</Link>
                        <button type="button" className="forgot" onClick={() => window.alert("This functionality will be among last items to be integrated")}>
                            Forgot Password?
                        </button>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default LoginForm;
