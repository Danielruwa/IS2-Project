import {Link} from "react-router-dom";

import '../styles/top-nav-stye.css'
import Notification from '../assets/bell.png';
import Setting from '../assets/cog.png';
import Profile from '../assets/user.png';
import Analytics from '../assets/chart.png';
import Util from "../utils/Util";

export default function TopNav() {

    const access_token = localStorage.getItem("access_token");
    const util: Util = new Util();
    if(!access_token) {
        return <GuestNav />
    } else {
        const decodedToken = util.decodeToken(access_token);
        if (!decodedToken) {
            localStorage.removeItem("access_token");
            return <GuestNav />
        }
        return <LoggedInNav />
    }

}

const GuestNav = () => {
    return (
        <div className="top-nav">
            <Link to={"/"} className="left-wrapper">
                <div className="org-logo">
                    WorthWise, Guest
                </div>
            </Link>

            <div className="mid-wrapper">
                <div className="links">
                    <Link to="/estimate">
                        <img src={Analytics} alt=""/>
                        <span>ESTIMATE</span>
                    </Link>
                    <Link to="/analytics">
                        <img src={Analytics} alt=""/>
                        <span>ANALYTICS</span>
                    </Link>
                </div>
            </div>

            <div className="right-wrapper">

                <Link to="/settings" className="settings">
                    <img src={Setting} alt=""/>
                </Link>
            </div>

        </div>
    )
}

const LoggedInNav = () => {
    return (
        <div className="top-nav">
            <Link to={"/"} className="left-wrapper">
                <div className="org-logo">
                    WorthWise, Logged
                </div>
            </Link>

            <div className="mid-wrapper">
                <div className="links">
                    <Link to="/estimate">
                        <img src={Analytics} alt=""/>
                        <span>ESTIMATE</span>
                    </Link>
                    <Link to="/analytics">
                        <img src={Analytics} alt=""/>
                        <span>ANALYTICS</span>
                    </Link>
                </div>
            </div>

            <div className="right-wrapper">
                <Link to="/notification" className="notifications">
                    <img src={Notification} alt=""/>
                </Link>
                <Link to="/settings" className="settings">
                    <img src={Setting} alt=""/>
                </Link>
                <Link to="/accounts" className="account">
                    <img src={Profile} alt=""/>
                </Link>
            </div>

        </div>
    )
}
