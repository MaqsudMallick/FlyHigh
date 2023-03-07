import React from 'react'
import {useState, useEffect} from 'react';
function Special(){
    const [recommendations, setRecommendations] = useState([]);
    const [index, inccIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
        fetch(`http://localhost:8080/speciallist`)
          .then(data => data.json())
          .then(data => setRecommendations(data.token.split("<br />").map((flight) =>{
          var params = flight.split(',')
          params = params.map(e=>{return `${e.split(':')[1]}${e.split(':').length>2?':'+e.split(':')[2]:''}`})
          const img = `A${Math.floor(Math.random()*3)+1}.png`;
          return (
            <div class='w-50 m-auto'>
             <div style={{background: 'inherit'}} class="card"><img class="card-img-top" src={img} alt="Card image cap" with="100" height="180" />
             <div>
             <h1 class="card-title">{params[0]} to {params[1]}</h1>
             <p class="card-text"><span>{params[2]}</span>
            <span>{params[3]} leg(s)</span>
            <h5>${Math.floor(Math.random()*1000)+1000}</h5></p>
             </div>
             </div>
            </div>
          )})))
          .catch(error => console.error(error));
        }, 5000);
        return ()=>clearInterval(interval)
      }, []);
      return(
        <div class="text-center">
        <h2 class="text-decoration-underline">Specials</h2>
        <br></br>
        <div style={{height: 200}}>
            <p>{recommendations.map((e, i)=>{if(i==index) return e})}</p>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" onClick={()=>{if(index!=0)inccIndex(index-1)}}>
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" onClick={()=>{if(index<recommendations.length)inccIndex(index+1)}}>
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
        </a>
        </div>);
}

export default Special

