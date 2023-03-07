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
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ul>
            {recommendations}
        </ul>
        </div>
            </>);
}

export default Special

{/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="..." alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> */}