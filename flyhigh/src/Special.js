import React from 'react'
import {useState, useEffect} from 'react';
function Special(){
    const [recommendations, setRecommendations] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
        fetch(`http://localhost:8080/speciallist`)
          .then(data => data.json())
          .then(data => setRecommendations(data.token.split("<br />").map(flight => <li>{flight}</li>)))
          .catch(error => console.error(error));
        }, 5000);
        return ()=>clearInterval(interval)
      }, []);
      return(
        <>
        <h2>Specials</h2>
        <br></br>
        <ul>
            {recommendations}
        </ul>
            </>);
}

export default Special