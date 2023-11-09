import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/LoginForm";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Estimate from "./components/Estimate";
import MyList from "./components/MyList";
import Notifications from "./components/Notifications";
import MyProfile from "./components/MyProfile";
import AddProperty from "./components/AddProperty";
import Dashboard from "./components/Dashboard";
import Favorites from "./components/Favorites";

export default function Paths() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegistrationForm/>}/>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"/add-property"} element={<AddProperty/>}/>
                <Route path={"/my-profile/:id"} element={<MyProfile/>}/>
                <Route path={"/notifications"} element={<Notifications/>}/>
                <Route path={"/my-list"} element={<MyList/>}/>
                <Route path={"/estimate"} element={<Estimate/>}/>
                <Route path={"/favorites"} element={<Favorites/>}/>
            </Routes>
        </BrowserRouter>
    )
}