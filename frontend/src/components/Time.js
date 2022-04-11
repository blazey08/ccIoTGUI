import '../App.css';
import React, { useState, useEffect } from 'react';

function Time() {
  const [time, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
      setStringMsg(data.string);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Data sent: {stringMsg}</h1> */}
        <p>The current time is {curTime}</p>
      </header>
    </div>
  );

}

export default Time;
