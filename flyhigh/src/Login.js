import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const {setToken, setLocation} = props;
  const [locationInput, setLocationInput] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(locationInput);
    const token = await loginUser({
      username,
      password,
      location: locationInput
    });
    setToken(token);
    setLocation(locationInput);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username *</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password *</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Location *</p>
          <input type="text" onChange={e => setLocationInput(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired
};
