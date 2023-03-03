import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Preferences from './Preferences';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();
  const [location, setLocation] = useState("");
  const [dest, setDest] = useState("");


  if(!token) {
    return <Login setToken={setToken} setLocation={setLocation} location={location} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Preferences  setLocation={setLocation} setDest={setDest} location={location}></Preferences>
      {location && <Dashboard location={location} dest={dest}/> }
    </div>
  );
}

export default App;
