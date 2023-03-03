import React from 'react';
import {useState, useEffect} from 'react';
   

export default function Dashboard(props) {
    const [recommendations, setRecommendations] = useState();
    useEffect(() => {
        fetch(`http://localhost:8080/search?s=${props.location}&d=${props.dest}`)
          .then(data => data.json())
          .then(data => setRecommendations(data.token.split("<br />").map(flight => <li>{flight}</li>)))
          .catch(error => console.error(error));
      }, [props]);

  return(
    <>
    <h2>Dashboard</h2>
    <br></br>
    <ul>
        {recommendations}
    </ul>
        </>
  );
}