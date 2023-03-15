import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

var position = [20.6, 80.2];
var delhi = [28.65195, 77.23149];
var kolkata = [22.56263, 88.36304];
var mumbai =[19.07283, 72.88261];
var hyderabad =[17.38405, 78.45636];
var ahmedabad =[23.02579, 72.58727];
var chennai =[13.08784, 80.27847];
var lucknow = [26.83928, 80.92313];
var surat = [21.19594, 72.83023];
var jaipur =[26.91962, 75.78781];
var pune = [18.51957, 73.85535];


const cities = ["Mumbai", "Delhi", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Lucknow", "Surat", "Pune", "Jaipur"]
const cityCoordinates = {
  "Mumbai": [19.07283, 72.88261],
  "Delhi": [28.65195, 77.23149],
  "Hyderabad": [17.38405, 78.45636],
  "Ahmedabad": [23.02579, 72.58727],
  "Chennai": [13.08784, 80.27847],
  "Kolkata": [22.56263, 88.36304],
  "Lucknow": [26.83928, 80.92313],
  "Surat": [21.19594, 72.83023],
  "Pune": [18.51957, 73.85535],
  "Jaipur": [26.91962, 75.78781]
};

function IndiaMap(props) {
   
  return (
    <MapContainer center={position} zoom={5} scrollWheelZoom={false} className="map-leaflet-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={delhi}>
      </Marker>
      <Marker position={kolkata}>
      </Marker>
      <Marker position={hyderabad}>
      </Marker>
      <Marker position={ahmedabad}>
      </Marker>
      <Marker position={chennai}>
      </Marker>
      <Marker position={lucknow}>
      </Marker>
      <Marker position={surat}>
      </Marker>
      <Marker position={jaipur}>
      </Marker>
      <Marker position={pune}>
      </Marker>
      <Marker position={mumbai}>
      </Marker>
    {props.route.length>1 && <Polyline positions={props.route.map(e=>e.trim()).map(e=>cityCoordinates[e])} color="green" />}
    </MapContainer>
  );
}

export default IndiaMap;
