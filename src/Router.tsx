import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";

export default function MainRouter() {

    return (
        <Router>
            <Routes>
                <Route element={<Landing />} path="/" />
                <Route element={<Registration />} path="/registration" />
                <Route element={<Profile />} path="/profile/:id" />
            </Routes>
        </Router>
    )
}