import { onAuthStateChanged } from "firebase/auth";
import { auth } from 'firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import pillbottle from './images/pillbottle.png';


// Import any components that you want to use, like the login form
import Login from './components/Login'; 
import React from './components/Hello';

// function must have the same name as the file, cAsE sEnSiTiVe
function App() {

  // navigate an authenticated user to the user homepage, rather than the regular homepage
  const navigate = useNavigate();
  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is logged in
            navigate("/home");
          }
        });    
  }, [navigate])
 
  // HTML rendered here
  // Inside the return statement, we MUST have <div> tags at the beginning and end. 
  // We can choose to write vanilla HTML as normal, or use some of our React components. Here, I used Login
  return (
    <div className="container-fluid">
        <h2>
        MED
      </h2>
      <hr>
          
          </hr>
      <h2>
        MATES
      </h2>
        <p>
       <br />  Safe use rooms for you
        </p>
        <Login />

        <img src={pillbottle}></img>
        
      
    </div>
  );
}
 
export default App;
