import React from 'react';
import MainRouter from './Router';
import "./App.css"

function App() {
  return (
 <React.Suspense fallback={<div>Loading...</div>}>
    <MainRouter/>
 </React.Suspense>
  );
}

export default App;
