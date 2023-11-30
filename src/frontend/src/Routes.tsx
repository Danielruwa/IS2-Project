import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/LoginForm";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Estimate from "./components/Estimate";
import MyList from "./components/MyList";
import MyProfile from "./components/MyProfile";
import AddProperty from "./components/AddProperty";
import Dashboard from "./components/Dashboard";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import Property from "./components/Property";
import UpdatePropertyForm from "./components/UpdatePropertyForm";
import About from "./components/About";
import Contact from "./components/Contact";

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
                <Route path={"/my-list"} element={<MyList/>}/>
                <Route path={"/estimate"} element={<Estimate/>}/>
                <Route path={"/favorites"} element={<Favorites/>}/>
                <Route path={"/search"} element={<Search/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
                <Route path={"/property/:id"} element={<Property/>}/>
                <Route path={"/update-property/:id"} element={<UpdatePropertyForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}