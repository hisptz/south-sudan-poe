import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Layout from "./shared/components/Layout";

export default function MainRouter() {

    return (
        <Router>
            <Routes>
                <Route element={<Layout />} path="/" >
                    <Route index element={<Home />}/>
                    <Route element={<Home />} path="/home"/>
                    <Route element={<Registration />} path="/registration" />
                    <Route element={<Profile />} path="/profile/:id" />
                </Route>
            </Routes>
        </Router>
    )
}