import React, { useState } from 'react';
import {
  withRouter
} from 'react-router-dom';
import Header from '../../components/Header/Header';

import { useDispatch, useSelector } from 'react-redux';

const headerList = ["Traveller", "Sign Up", "Sign In", "Place Order"];

const HeaderContainer = (props) => {
  const [isSignIn, setAuthAction] = useState(false);

  const handleAction = (redirectTo) => {
    props.history.push(redirectTo);  
  }

  return <>
    <Header
      isSignIn = { isSignIn }
      handleNavAction = {handleAction}
      headerList = { headerList } /> 
  </>
};

export default withRouter(HeaderContainer);