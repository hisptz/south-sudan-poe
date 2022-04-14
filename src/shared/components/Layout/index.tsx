import { useDataEngine } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { engineState } from "../../../core/hooks/engine";
// import { getBookings } from "../../../core/services/BookingService";
import Toolbar from "./components/Toolbar";
import './Layout.css'
function Layout() {
const engine = useRecoilValue(engineState)
useEffect(() => {
    // getBookings(engine);
},[])
    return (<>
        <Toolbar />
        <div className="content">
            <Outlet />
        </div>
    </>);
}

export default Layout;