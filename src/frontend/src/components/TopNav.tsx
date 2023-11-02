import {Link, useNavigate} from "react-router-dom";

import '../styles/top-nav-stye.css'
import Notification from '../assets/bell.png';
import Profile from '../assets/user.png';
import Analytics from '../assets/chart.png';
import Login from '../assets/login.png';
import Estimate from '../assets/estimate.png';
import Util from "../utils/Util";
import {useState} from "react";

export default function TopNav() {

    const access_token = localStorage.getItem("access_token");
    const util: Util = new Util();
    const [isBuyer, setIsBuyer]: any = useState(false);
    const navigate = useNavigate();

    if(!access_token) {
        return <>
            <GuestNav />
            <Search />
        </>
    } else {
        const decodedToken = util.decodeToken(access_token);
        if (!decodedToken) {
            localStorage.removeItem("access_token");
            return <>
                <GuestNav />
                <Search />
            </>
        }

        return  <>
            {isBuyer ? <BuyerLoggedInNav /> : <SellerLoggedInNav />}
            <Search />
        </>
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

const BuyerLoggedInNav = () => {
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

                <Link to="/notification" className="notifications">
                    <img src={Notification} alt=""/>
                </Link>
                <Link to="/account" className="account">
                    <img src={Profile} alt=""/>
                </Link>
            </div>

        </div>
    )
}

const SellerLoggedInNav = () => {
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
                    <Link to="/my-list">
                        <span>MY LIST</span>
                    </Link>
                    <Link to="/estimate">
                        <span>ESTIMATE</span>
                    </Link>
                </div>
            </div>

            <div className="right-wrapper">
                <button className="btn-create" onClick={() => navigate("/home/add-property")}>
                    Add Property
                </button>
                <Link to="/notification" className="notifications">
                    <img src={Notification} alt=""/>
                </Link>
                <Link to="/accounts" className="account">
                    <img src={Profile} alt=""/>
                </Link>
            </div>
        </div>
    )
}

export const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const onFormSubmit = () => {
        navigate("/search?" + searchTerm);
    }

    return (
        <form className="search-form" onSubmit={onFormSubmit} >
            <input required onChange={(e: any) => setSearchTerm(e.target.value)} type="search" className="search-box"/>
            <button onSubmit={onFormSubmit} type={"submit"}>Search</button>
        </form>
    )

}