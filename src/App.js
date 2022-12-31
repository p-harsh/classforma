import React from 'react';
import Viewer from './Viewer/Viewer'
import Controller from './Controller/Controller'

import './App.css';

function App() {
  return (
    <div className="App">
      <Controller/>
      <Viewer/>
    </div>
  );
}

export default App;
