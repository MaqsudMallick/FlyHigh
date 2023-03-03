import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <>
    <form onSubmit={handleSubmit}>
      <label>
          <p>Departure City</p>
          <input type="text" value={locationInput} onChange={e => setLocationInput(e.target.value)} required/>
        </label>
        <label>
          <p>Arrival City</p>
          <input type="text" onChange={e => setArrLocationInput(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
    </form>
    </>
  );
}

Preferences.propTypes = {
  setLocation: PropTypes.func.isRequired,
  setDest: PropTypes.func.isRequired
};