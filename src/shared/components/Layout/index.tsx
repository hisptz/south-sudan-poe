import {Outlet, useLocation} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import classes from "./Layout.module.css";
import {ErrorBoundary} from "react-error-boundary";
import Error from "../Error";
import React, {Suspense} from "react";
import Loader from "../Loader";
import Back from "../Back";
import LanguageSelector from "../Dropdown";

function Layout() {
    const location = useLocation();
    const hideBackButton = location.pathname === "/";
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Toolbar/>
            <div className={classes["content"]}>
                <div
                    style={hideBackButton ? {justifyContent: "flex-end"} : undefined}
                    className={classes["action-row"]}>
                    {!hideBackButton && (
                        <Back/>
                    )}
                    <div
                        className={classes["language-selector"]}>
                        <LanguageSelector/>
                    </div>
                </div>
                <ErrorBoundary resetKeys={[location]} FallbackComponent={Error}>
                    <Suspense fallback={<Loader small/>}>
                        <Outlet/>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default Layout;
