import React from 'react'
// import logo from './logo.svg';
import './App.css'
import ToDoDragDropDemo from './components/ToDoDragDropDemo'
import ToDoDragDropDemoMUI from './components/ToDoDragDropDemoMUI'
import ToDoDragDropDemoMuiHooks from './components/ToDoDragDropDemoMuiHooks'
import ToDoDragDropDemoMuiHooksCurrying from './components/ToDoDragDropDemoMuiHooksCurrying'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDoDragDropDemo />
        <ToDoDragDropDemoMUI />
        <ToDoDragDropDemoMuiHooks />
        <ToDoDragDropDemoMuiHooksCurrying />
      </header>
    </div>
  )
}

export default App
