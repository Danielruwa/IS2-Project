import {Link, useNavigate} from "react-router-dom";

import '../styles/top-nav-stye.css'
import Notification from '../assets/bell.png';
import Profile from '../assets/user.png';
import Login from '../assets/login.png';
import Logout from '../assets/exit.png';
import ArrowDown from '../assets/arrow-down.png';
import Util from "../utils/Util";
import React, {useState} from "react";
import {NotificationManager} from "react-notifications";


interface Name {
    name: string;
}

export function logout() {
    localStorage.clear();
    NotificationManager.success("You have successfully logged out.")
    window.location.pathname = "/home"
}

export default function TopNav() {

    const access_token = localStorage.getItem("accessToken");
    const util: Util = new Util();

    if (!access_token) {
        return <GuestNav/>

    } else {
        const decodedToken = util.decodeToken(access_token);
        if (!decodedToken) {
            localStorage.removeItem("access_token");
            return <GuestNav/>
        }

        const user = JSON.parse(localStorage.getItem("user") ?? "{}");
        return <div>{user.role == "BUYER" ? <BuyerLoggedInNav name={user.name} /> : <SellerLoggedInNav name={user.name}/>} </div>

    }

}

const GuestNav = () => {

    const navigate = useNavigate()

    return (
        <div className="top-nav">
            <Link to={"/"} className="left-wrapper">
                <div className="org-logo">
                    WorthWise
                </div>
            </Link>

            <div className="mid-wrapper">
                <div className="links">
                    <Link to="/home">
                        <span>HOME</span>
                    </Link>
                    <Link to="/estimate">
                        <span>ESTIMATE</span>
                    </Link>
                </div>
            </div>

            <div className="right-wrapper">

                <button className="btn-create" onClick={() => navigate("/register")}>
                    Start Listing Today
                </button>

                <Link to="/login" className="settings">
                    <img src={Login} alt=""/>
                </Link>

            </div>
        </div>
    )
}

const BuyerLoggedInNav: React.FC<Name> = ({name}) => {
    return (
        <div className="top-nav">
            <Link to={"/"} className="left-wrapper">
                <div className="org-logo">
                    WorthWise
                </div>
            </Link>

            <div className="mid-wrapper">
                <div className="links">
                    <Link to="/home">
                        <span>HOME</span>
                    </Link>
                    <Link to="/estimate">
                        <span>ESTIMATE</span>
                    </Link>
                    <Link to="/favorites">
                        <span>FAVORITES</span>
                    </Link>
                </div>
            </div>

            <div className="right-wrapper">

                <Link to={`/my-profile/${name}`} className="account">
                    <img src={Profile} alt=""/>
                </Link>
                <Link to="/logout" onClick={logout} className="account">
                    <img src={Logout} alt=""/>
                </Link>
            </div>

        </div>
    )
}


const SellerLoggedInNav: React.FC<Name> = ({name}) => {
    const navigate = useNavigate();

    return (
        <div className="top-nav">
            <Link to={"/"} className="left-wrapper">
                <div className="org-logo">
                    WorthWise
                </div>
            </Link>

            <div className="mid-wrapper">
                <div className="links">
                    <Link to="/dashboard">
                        <span>DASHBOARD</span>
                    </Link>
                    <Link to="/my-list">
                        <span>MY LIST</span>
                    </Link>
                    <Link to="/estimate">
                        <span>ESTIMATE</span>
                    </Link>
                </div>
            </div>

            <div className="right-wrapper">

                <button className="btn-create" onClick={() => navigate("/add-property")}>
                    Add Property
                </button>
                <Link to={`/my-profile/${name}`} className="account">
                    <img src={Profile} alt=""/>
                </Link>
                <Link to="/home" onClick={logout} className="account">
                    <img src={Logout} alt=""/>
                </Link>


            </div>
        </div>
    )
}

export const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const onFormSubmit = () => {
        navigate("/search?value=" + searchTerm);
    }

    return (
        <form className="search-form" onSubmit={onFormSubmit}>
            <input required onChange={(e: any) => setSearchTerm(e.target.value)} name="value" type="search" className="search-box"/>
            <button onSubmit={onFormSubmit} type={"submit"}>Search</button>
        </form>
    )

}