import React from 'react';
import {useState, useEffect} from 'react';
import {unstable_batchedUpdates} from 'react-dom'
import IndiaMap from './IndiaMap';

const cities = ["Mumbai", "Delhi", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Lucknow", "Surat", "Pune", "Jaipur"]
export default function Dashboard(props) {

    var cityList = [];
    const [recommendations, setRecommendations] = useState();
    const [route, setRoute] = useState(["Kolkata"]);
    const [isMap, toggleMap] = useState({isHidden: true});
    const payment = (e)=>{
        //e.preventDefault();
        alert('Payment Successful!')
    }

    useEffect(() => {
        fetch(`http://localhost:8080/search?s=${props.location}&d=${props.dest}`)
          .then(data => data.json())
          .then(data => setRecommendations(data.token.split("<br />").map((flight,index) => {
            var params = flight.split(',')
          params = params.map(e=>{return `${e.split(':')[1]}${e.split(':').length>2?':'+e.split(':')[2]:''}`})
          const idp = `payout${index}`;
          const idm = `map${index}`
          const hrid = `#${idp}`
          const hrmid = `#${idm}`
          const filteredcities = cities.filter(city => city!=props.location && city!=props.dest);
          const randomCities = [];
        while (randomCities.length < parseInt(params[3]) && filteredcities.length > 0) {
          const index = Math.floor(Math.random() * filteredcities.length);
          randomCities.push(filteredcities.splice(index, 1)[0]);
        }
        const result = randomCities.join("-to-");
        const hoplist = parseInt(params[3])==0?'no stop':`${params[0]}-to-${result}-to-${params[1]}     ${params[3]} leg(s)`;
        randomCities.unshift(params[0]);
        randomCities.push(params[1]);
        cityList.push(randomCities);
          return ( <>
          <div class="list-group list-group-flush border-bottom scrollarea w-40">
          <a href={hrid} data-bs-toggle="collapse" role="button" class="list-group-item list-group-item-action active py-3 lh-sm" aria-current="true">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{params[0]} to {params[1]}</strong>
              <small>{params[2]}</small>
            </div>
            <div class="col-10 mb-1 small">{hoplist} &emsp;&emsp;${Math.floor(Math.random()*1000)+1000}</div>
          </a>
          {/* Visualize  */}
          <button type="button" onClick={(e)=>{
            unstable_batchedUpdates(() => {
              setRoute(cityList[index]); toggleMap({isHidden: !isMap.isHidden});
         })}} class="btn btn-success"  data-toggle="collapse" data-target="#mapofindia">Visualize</button>
        
          {/* Collapse */}
          <div class="collapse" id={idp}>
        <form class="needs-validation" noValidate="">
          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required="" />
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required="" />
              <label class="form-check-label" for="debit">Debit card</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required="" />
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>
          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required="" />
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required="" />
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required="" />
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required="" />
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>
          <br />
          <button class="w-100 btn btn-success btn-lg" type="submit" onClick={payment}>Continue to checkout</button>
          </form>
          </div>
        </div>
        
        </>);
        })))
          .catch(error => console.error(error));
      }, [props]);
  const visstyle = {visibility: isMap.isHidden?'hidden':'visible'};
  return(
    <>
    <h2 class="text-center text-decoration-underline">Dashboard</h2>
    {/* <a href="#mapcentral" data-bs-toggle="collapse" role="button" class="btn btn-success">Visualize</a> */}
    <div style={visstyle}>
    <IndiaMap route={route} />
    </div>
    <button class="map-cross btn btn-danger" onClick={()=>{toggleMap({isHidden: !isMap.isHidden})}}>
        X
      </button>
    {/* <div class="collapse" id="mapcentral"><IndiaMap /></div> */}
    
    <br></br>
    {/* {recommendations} */}
    <div>
        {recommendations}
    </div>
        </>
  );
}