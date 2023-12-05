import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from 'firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';
import {Icon} from 'leaflet';
import redpin from '../images/redpin.png'; 
import bluepin from '../images/bluepin.png';


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
const red = new Icon ({
    iconUrl : redpin,
    iconSize : [50, 50], // size of the icon
    iconAnchor : [25, 25], // point of the icon which will correspond to marker's location
    popupAnchor : [-3, -20] // point from which the popup should open relative to the iconAnchor

  })

    //Define custom icons for different categories
const blue = new Icon ({
  iconUrl : bluepin,
  iconSize : [35, 50], // size of the icon
  iconAnchor : [25, 25], // point of the icon which will correspond to marker's location
  popupAnchor : [-3, -20] // point from which the popup should open relative to the iconAnchor

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
          <Marker position={[48.4320473, -123.3295302]} icon={red}>
            <Popup>
              Royal Jubilee Hospital<br />1952 Bay St, Victoria, BC V8R 1J8<br />250-370-8000<br />An open hospital
            </Popup>
          </Marker>
          <Marker position={[48.4657321, -123.4292546]} icon={red}>
            <Popup>
              Victoria General Hospital. <br /> 250-727-4212<br />1 Hospital Way, Victoria, BC V8Z 6R5<br /> An open hospital
            </Popup>
          </Marker>
          <Marker position={[48.4276652, -123.3603018]} icon={blue}>
            <Popup>
              The Harbour Inhalation Site <br /> 926 Pandora Ave, Victoria, BC <br /> 778-966-4348 <br /> A public safe-use room
            </Popup>
          </Marker>
          <Marker position={[48.4476886,-123.3829843]} icon={blue}>
            <Popup>
              Rock Bay Landing Shelter <br /> 535 Ellice St, Victoria, BC V8T 2G8 <br /> 250-383-1951 <br /> A public safe-use room
            </Popup>
          </Marker>
          <Marker position={[48.4476886,-123.3829843]} icon={blue}>
            <Popup>
              Rock Bay Landing Shelter <br /> 535 Ellice St, Victoria, BC V8T 2G8 <br /> 250-383-1951 <br /> A public safe-use room
            </Popup>
          </Marker>
          <Marker position={[48.4274522,-123.3592126]} icon={blue}>
            <Popup>
              The Harbour Injection Site <br /> 941 Pandora Ave, Victoria, BC <br />250-519-5303 <br /> A public safe-use room
            </Popup>
          </Marker>
        </MapContainer>
        
        </div>
        <h2>
        <br/>MED
      </h2>
      <hr>
          
          </hr>
      <h2>
        MATES
      </h2>
</div>
    )
}



export default UserHome