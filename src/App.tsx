import React, { useEffect } from 'react';
import MainOutlet from './App-routing';
import "./App.css"

function App() {
 
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MainOutlet />
    </React.Suspense>
  );
}

export default App;
