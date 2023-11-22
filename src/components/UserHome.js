import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from 'firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';
import {Icon} from 'leaflet';
import redpin from '../images/redpin.png'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const UserHome = () => {

    // Use this code (lines 9-18) on other pages that you only want authenticated users to see
    const currentUser = auth.currentUser;
    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (!user) {
              // No user is logged in. Navigate them to the login page
              navigate("/login");
            }
          });    
    }, [navigate])

    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful. Redirect to landing page
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    }
 
//Define custom icons for different categories
const RJH = new Icon ({
    iconUrl : redpin,
    iconSize : [50, 50], // size of the icon
    iconAnchor : [25, 25], // point of the icon which will correspond to marker's location
    popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor

  })

//Define custom icons for different categories
const VJH = new Icon ({
    iconUrl : redpin,
    iconSize : [50, 50], // size of the icon
    iconAnchor : [25, 25], // point of the icon which will correspond to marker's location
    popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor

    })


    return (
        <div className="container-fluid">        
            <h1>Welcome back, {currentUser.email}</h1>
            <p>
                Red pings: Hospitals, Blue pings: Safe-use Rooms
            </p>
            <button onClick={handleLogout}>Logout</button>
             <div id="map">
        <MapContainer center={[48.4284, -123.3656]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[48.4320473, -123.3295302]} icon={RJH}>
            <Popup>
              Royal Jubilee Hospital.<br /> A safe space to go for help
            </Popup>
          </Marker>
          <Marker position={[48.4657321, -123.4292546]} icon={VJH}>
            <Popup>
              Victoria General Hospital. <br /> An open hospital
            </Popup>
          </Marker>
        </MapContainer>
        </div>
</div>
    )
}


 
export default UserHome