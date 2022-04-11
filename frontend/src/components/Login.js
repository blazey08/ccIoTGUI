import '../App.css';
import axios from "axios";
import React from 'react';

function handleButton(e){
    e.preventDefault();

    const data = new FormData()
    data.append('bType', e.target.id)

    axios.post('/', {'bType': e.target.id}).then((response) => {
        console.log(response.data);
      });

}    

function Login(){

    return(
        <div>
            <header>Main Page</header>
            <title>Main Page</title>
            <button id="metrics" onClick={handleButton}>Metrics</button>
            <button id="upload" onClick={handleButton}>Upload Image</button> 
        </div>

    )
}

export default Login;