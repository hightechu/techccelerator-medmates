import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from 'firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';
 
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
 
    return (
        <div className="container-fluid">        
            <h1>Welcome back, {currentUser.email}</h1>
            <p>
                This is your user homepage. This is a good place to put their main feed.
            </p>
            <p><abbr title="Google maps"></abbr></p>
            <button onClick={handleLogout}>Logout</button>
            <div class="embed-responsive embed-responsive-21by9">
            <iframe class="embed-responsive-item" title='maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24472.948889600277!2d-123.38690614802564!3d48.422387305994974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548f7485365d4cc9%3A0x1ed8d37dd7f1b902!2sDowntown%2C%20Victoria%2C%20BC!5e0!3m2!1sen!2sca!4v1699408848324!5m2!1sen!2sca" 
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" title='locations' allowfullscreen></iframe>
</div>
        </div>
    )
}


 
export default UserHome