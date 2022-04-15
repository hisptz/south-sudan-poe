import {Outlet, useLocation,} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import classes from './Layout.module.css'
import {ErrorBoundary} from "react-error-boundary";
import Error from "../Error";
import React, {Suspense} from "react";
import Loader from "../Loader";
import Back from "../Back";

function Layout() {
    const location = useLocation();
    const hideBackButton = location.pathname === '/';
    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
            <Toolbar/>
            <div className={classes['content']}>
                {
                    !hideBackButton && <div style={{paddingLeft: 16, paddingTop: 16}}>
                        <Back/>
                    </div>
                }
                <ErrorBoundary resetKeys={[location]} FallbackComponent={Error}>
                    <Suspense fallback={<Loader small/>}>
                        <Outlet/>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>);
}

export default Layout;
