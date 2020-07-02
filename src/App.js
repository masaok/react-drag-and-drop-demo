import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ToDoDragDropDemo from './components/ToDoDragDropDemo'
import ToDoDragDropDemoMUI from './components/ToDoDragDropDemoMUI'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDoDragDropDemo />
        <ToDoDragDropDemoMUI />
      </header>
    </div>
  );
}

export default App;
