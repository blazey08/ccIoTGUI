import './App.css';
import Login from './components/Login';
import Upload from './components/Upload';
import Metrics from './components/Metrics';
import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function App() {
  return(
    <div className="App">
      <title>CCIoT GUI</title>
      <BrowserRouter>
        <div id ="navbar">
          <Link id="homebutton" className='navbutton' to="/">Home</Link>
          <Link id="uploadnavbutton" className='navbutton' to="/upload">Upload</Link>
          <Link id="metricsbutton" className='navbutton' to="/metrics">Metrics</Link>
        </div>
        <Routes>
          <Route exact path="/" element={<Login/>}>
          </Route>
          <Route path="/upload" element={<Upload/>}>
          </Route>
          <Route path="/metrics" element={<Metrics/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;