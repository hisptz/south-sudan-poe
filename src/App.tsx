import React from 'react';
import MainOutlet from './App-routing';
import "./App.css"
import {usePullBookingMetadata} from './core/hooks/booking.hooks';
import Loader from "./shared/components/Loader";



function App() {
    usePullBookingMetadata();

    return (
        <React.Suspense fallback={<Loader/>}>
            <MainOutlet/>
        </React.Suspense>
    );
}

export default App;
