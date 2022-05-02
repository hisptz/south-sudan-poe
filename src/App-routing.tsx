import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import MyApplication from "./pages/MyApplication";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import { HomeSearch } from "./pages/Registration/components/Search/Search";
import Layout from "./shared/components/Layout";

export default function MainOutlet() {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route element={<Layout/>} path="/">
                    <Route index element={<Home/>}/>
                    <Route element={<Home/>} path="/home"/>
                    <Route element={<Registration/>} path="/registration"/>
                    <Route element={<Registration/>} path="/registration/:id"/>
                    <Route element={<Profile/>} path="/profile/:id"/>
                    <Route element={<MyApplication/>} path="/my-application"/>
                    <Route element={<HomeSearch/>} path="/search"/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}
