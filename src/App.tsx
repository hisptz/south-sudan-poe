import { useConfig } from '@dhis2/app-runtime';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainOutlet from './App-routing';
import "./App.css"
import Toolbar from './shared/components/Layout/components/Toolbar';

function App() {
  const {baseUrl} = useConfig()
  console.log({baseUrl})
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MainOutlet />

    </React.Suspense>
  );
}

export default App;
