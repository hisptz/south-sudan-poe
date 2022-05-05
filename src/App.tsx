import React from "react";
import MainOutlet from "./App-routing";
import "./App.css";
import {usePullBookingMetadata} from "./core/hooks/booking.hooks";
import Loader from "./shared/components/Loader";
import {useRecoilValue} from "recoil";
import {LocaleState} from "./core/states/language";
import i18n from "@dhis2/d2-i18n";

import {CssReset} from '@dhis2/ui'

function App() {
    i18n.changeLanguage(useRecoilValue(LocaleState));
    usePullBookingMetadata();

    return (
        <React.Suspense fallback={<Loader/>}>
            <CssReset/>
            <MainOutlet/>
        </React.Suspense>
    );
}

export default App;
