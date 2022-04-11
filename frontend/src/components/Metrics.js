import "../App.css"
import axios from "axios";
import React, { useEffect, useState } from 'react';




function Metrics(){

    const [metric, setMetric] = useState([{"advertisement-name": "male.jpg", "viewCount": "1"}]);

    useEffect(() => {
        fetch('/metrics').then(res => res.json()).then(data => {
            setMetric(data.data)
            console.log(metric)
        });
    }, []);
    


    return(            

        <div>        
            <h1>Metrics</h1>
            <table>
                <tr>
                    <th>Advertisement</th>
                    <th>Number of Views</th>
                </tr>
                {metric.map((item) => (
                    <tr key={item["advertisement-name"]}>
                        <td>{item["advertisement-name"]}</td>
                        <td>{item["viewCount"]}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Metrics;