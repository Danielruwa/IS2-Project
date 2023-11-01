import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/LoginForm";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

export default function Paths() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegistrationForm/>}/>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/home"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}