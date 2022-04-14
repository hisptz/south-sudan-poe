import { Outlet } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import './Layout.css'
function Layout() {
    return (<>
        <Toolbar />
        <div className="content">
            <Outlet />
        </div>
    </>);
}

export default Layout;