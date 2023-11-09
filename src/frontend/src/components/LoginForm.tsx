import React, {useRef, useState} from 'react';
import "../styles/auth-style.css"
import {Link, useNavigate} from "react-router-dom";
import {NotificationManager} from "react-notifications";

const LoginForm: React.FC = () => {
    document.title = "Login";

    const [formData, setFormData] = useState({email: '', password: ''});
    const submitBtn: any = useRef(null);
    const loaderAnim: any = useRef(null);
    const navigate = useNavigate();

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

        console.log(formData)

        const login = async (): Promise<any> => {

            const loginResponse: any = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            }).then(res => {
                console.log(res)
                try {
                    return res.json();
                } catch (err: any) {
                    NotificationManager.error("Error: " + err.message)
                }
            });

            submitBtn.current.classList.remove("disabledSubmit");
            submitBtn.current.disabled = false;
            loaderAnim.current.classList.add("hidden");

            if(loginResponse.status) {
                NotificationManager.error("Invalid username or password");
                return;
            }

            if (loginResponse.access_token) {
                localStorage.setItem("Test", "this is a test")
                localStorage.setItem("accessToken", loginResponse.access_token);
                localStorage.setItem("user", JSON.stringify(loginResponse.user));
                localStorage.removeItem("redirectURL")
                NotificationManager.success("Login successful");
                redirectURL != null ? navigate(redirectURL) : navigate("/");
            } else {
                NotificationManager.error("Could not login!")
            }

        }

        login().catch(() => {
            NotificationManager.error("An error occurred!")
        })
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
