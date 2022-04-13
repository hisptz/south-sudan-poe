import { useDataEngine } from "@dhis2/app-runtime";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { engineState } from "./core/hooks/engine";
import Home from "./pages/Home";
import MyApplication from "./pages/MyApplication";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Layout from "./shared/components/Layout";

export default function MainOutlet() {
    const setEngineState = useSetRecoilState(engineState);
    const engine = useDataEngine();
    
setEngineState(engine);
    return (
        <Router>
            <Routes>
                <Route element={<Layout />} path="/" >
                    <Route index element={<Home />} />
                    <Route element={<Home />} path="/home" />
                    <Route element={<Registration />} path="/registration" />
                    <Route element={<Profile />} path="/profile/:id" />
                    <Route element={<MyApplication />} path="/my-application" />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}