import React from 'react'
import {useState, useEffect} from 'react';
function Special(){
    const [recommendations, setRecommendations] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
        fetch(`http://localhost:8080/speciallist`)
          .then(data => data.json())
          .then(data => setRecommendations(data.token.split("<br />").map(flight => <li><a class="d-inline-flex nav-link text-decoration-none">{flight}</a></li>)))
          .catch(error => console.error(error));
        }, 5000);
        return ()=>clearInterval(interval)
      }, []);
      return(
        <div class="d-flex flex-column flex-shrink-0 p-3">
        <h2>Specials</h2>
        <br></br>
        <ul class="nav nav-pills flex-column mb-auto">
            {recommendations}
        </ul>
            </div>);
}

export default Special