import React from 'react';
import { Outlet } from 'react-router-dom';
import MainRouter from './App-routing';
import "./App.css"
import Toolbar from './shared/components/Layout/components/Toolbar';

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MainRouter />
    </React.Suspense>
  );
}

export default App;
