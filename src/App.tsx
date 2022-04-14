import React from 'react';
import MainOutlet from './App-routing';
import "./App.css"
import { usePullBookingMetadata } from './core/hooks/booking.hooks';

function App() {
  usePullBookingMetadata();
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MainOutlet />
    </React.Suspense>
  );
}

export default App;
