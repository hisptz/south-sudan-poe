import React from 'react';
import MainOutlet from './App-routing';
import "./App.css"
import {usePullBookingMetadata} from './core/hooks/booking.hooks';
import Loader from "./shared/components/Loader";
import {useRecoilValue} from "recoil";
import {LocaleState} from "./core/states/language";


function App() {
    useRecoilValue(LocaleState);
    usePullBookingMetadata();

    return (
        <React.Suspense fallback={<Loader/>}>
            <MainOutlet/>
        </React.Suspense>
    );
}

export default App;
