import React, { useEffect } from 'react';
import './App.css';
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes , Route, }
from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Payment from "./Payment";  
import Orders from "./Orders";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51LgAMvSGm6vI1nZLRtUz4315y1FV1CsCHT7eDYheumYX40wqmEEDrCZ6UB7WpSXEtRTsU5XmTN734cOmrX7QiLhy00iW0WDZGl');


function App() {
  const[{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out		
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    }); 
  }, []);

  return (
    // BEM
    <Router>
    <div className="App">
      <Routes>
        <Route path="/orders" element={<><Header /><Orders /></>} />
        <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<><Header/><Checkout /></>} />
        <Route path="/" element={<><Header /><Home /></> } />
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
