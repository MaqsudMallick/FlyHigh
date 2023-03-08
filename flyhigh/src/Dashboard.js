import React from 'react';
import {useState, useEffect} from 'react';
 

export default function Dashboard(props) {
    const [recommendations, setRecommendations] = useState();
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
          const hrid = `#${idp}`
          return ( <>
          <div class="list-group list-group-flush border-bottom scrollarea w-40 m-auto">
          <a href={hrid} data-bs-toggle="collapse" role="button" class="list-group-item list-group-item-action active py-3 lh-sm" aria-current="true">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{params[0]} to {params[1]}</strong>
              <small>{params[2]}</small>
            </div>
            <div class="col-10 mb-1 small">{params[3]} leg(s) &emsp;&emsp;${Math.floor(Math.random()*1000)+1000}</div>
          </a>
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
          return <li>{flight}</li>})))
          .catch(error => console.error(error));
      }, [props]);

  return(
    <>
    <h2 class="text-center text-decoration-underline">Dashboard</h2>
    <br></br>
    {/* {recommendations} */}
    <div>
        {recommendations}
    </div>
        </>
  );
}