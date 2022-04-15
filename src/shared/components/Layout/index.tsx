import {Outlet} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import classes from './Layout.module.css'
import {ErrorBoundary} from "react-error-boundary";
import Error from "../Error";

function Layout() {
    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
            <Toolbar/>
            <div className={classes['content']}>
                <ErrorBoundary FallbackComponent={Error}>
                    <Outlet/>
                </ErrorBoundary>
                <div style={{paddingTop: 64}}/>
            </div>
        </div>);
}

export default Layout;
