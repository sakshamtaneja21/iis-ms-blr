import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Auth from './Auth/Auth';
import Header from './Header/Header';
import ProductContent from "./MainContent/MainContent";
import ProductDetails from "./ProductFunc/ProductDetails";
import OrderSec from './OderingSec/OrderSec';
import OrderDetails from "./OrderDetails/OrderDetails";
import TravellerDetails from "./TravellerDetails/TravellerDetails";
import Trips from "./Trips/Trips";
import Orders from "./Orders/Orders";

// Global styles
import './styles.css';


const App = () => {
  return <>
      <Router>
        <Header />
        <Route exact path="/">
          <ProductContent />
          {/* <ProductDetails /> */}
        </Route>
        <Route exact path="/order" component={OrderSec} />
        <Route exact path="/order-details" component={OrderDetails} />
        <Route exact path="/authentication" component={Auth} />
        <Route exact path="/travel-details" component={TravellerDetails} />
        <Route exact path="/orders_list" component={Orders} />
        <Route exact path="/trips_list" component={Trips} />
    </Router>
  </>
};

export default App;