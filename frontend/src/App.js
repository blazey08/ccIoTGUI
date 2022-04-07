import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [stringMsg, setStringMsg] = useState("");

  useEffect(() => {
    fetch('/home').then(res => res.json()).then(data => {
      console.log("data"+data)
      setStringMsg(data.here)
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data sent from: {stringMsg}</h1>
        <h2>{stringMsg}</h2>
      </header>
    </div>
  );

}

export default App;
