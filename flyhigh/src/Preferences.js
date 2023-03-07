import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Preferences.css'
export default function Preferences(props) {
  const [locationInput, setLocationInput] = useState(props.location);
  const [arrlocationInput, setArrLocationInput] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(locationInput);
    console.log(arrlocationInput);
    props.setLocation(locationInput);
    props.setDest(arrlocationInput);
  }

  return(
    <main class="form-signin w-100 m-auto text-center">
    
    <form class="d-flex flex-row mb-3" onSubmit={handleSubmit}>
      {/* <label> */}
        <div class="p-2 w-100 form-floating">
          <input id="floatingDeparture" class="form-control" placeholder="city" type="text" value={locationInput} onChange={e => setLocationInput(e.target.value)} required/>
        <label for="floatingDeparture" style={{padding: 25}}>Departure City</label>
        </div>
        <div class="p-2 w-100 form-floating">
          <input id="floatingArrival" class="form-control" placeholder='city' type="text" onChange={e => setArrLocationInput(e.target.value)}/>
        <label for="floatingArrival" style={{padding: 25}}>Arrival City</label>
        </div>
        <div class="p-2">
          <button class="btn btn-outline-success h-100" type="submit">Search</button>
        </div>
    </form>
    </main>
  );
}

Preferences.propTypes = {
  setLocation: PropTypes.func.isRequired,
  setDest: PropTypes.func.isRequired
};