import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainOutlet from './App-routing';
import "./App.css"
import BookingService from './core/services/BookingService';
import Toolbar from './shared/components/Layout/components/Toolbar';

function App() {
  useEffect(() => {
    new BookingService().getBookings();
  },[])
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MainOutlet />
    </React.Suspense>
  );
}

export default App;
