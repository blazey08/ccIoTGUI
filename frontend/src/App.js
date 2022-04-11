import './App.css';
import Login from './components/Login';
import Upload from './components/Upload';
import Metrics from './components/Metrics';
import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function clickNav(e){
  console.log(e.target.id)
  let navbuttons=["homebutton","uploadnavbutton","metricsbutton"]
  document.getElementById(e.target.id).classList.add("activenavbutton")
  for (let i=0;i<3;i++){
    if (navbuttons[i] !== e.target.id){
      document.getElementById(navbuttons[i]).classList.remove("activenavbutton")
    }
  }
}

function App() {
  return(
    <div className="App">
      <title>CCIoT GUI</title>
      <BrowserRouter>
        <div id ="navbar">
          <Link id="homebutton" className='navbutton' to="/" onClick={clickNav}>Home</Link>
          <Link id="uploadnavbutton" className='navbutton' to="/upload" onClick={clickNav}>Upload</Link>
          <Link id="metricsbutton" className='navbutton' to="/metrics" onClick={clickNav}>Metrics</Link>
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