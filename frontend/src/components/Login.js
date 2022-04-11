import '../App.css';
import React from 'react';

function Login(props){
    return(
        <div>
            <title>Main Page</title>
            <h1 id="hometext">Welcome, Amy</h1>
            <h2 id="what">What would you like to do today?</h2>
            <div id='bigbtnsdiv'>
                <button id="bigupload" className='bigbtn' onClick={props.pressbtn}>
                    <img className='svgicon' src='cloud_upload_black_24dp.svg' alt=""/>
                    Upload Ads
                </button>
                <button id="bigmetrics" className='bigbtn' onClick={props.pressbtn}>
                    <img className='svgicon' src='insights_black_24dp.svg' alt=""/>
                    View Metrics
                </button>
            </div>
        </div>

    )
}

export default Login;