import React, { useState } from 'react';
import {
  AppBar,
  Grid,
} from '@material-ui/core';
import styles from './Header.css';
import { IoIosMenu, IoIosPerson } from "react-icons/io";
import clx from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import UserProfile from "../UserProfile/UserProfile";

const useStyles = makeStyles({
  root: {
    position:"relative",
    height:"70px",
  },
  logoIcon:{
    fontSize: "26px",
    fontWeight: "800",
    cursor: "pointer",
    alignSelf: "flex-start",
    flexBasis: "35%",
    color: "#00a699",
  },
  shopperBtn:{
    backgroundColor: "#00a699",
    color: "#ffffff",
    width: "150px",
    textAlign: "center",
    borderRadius: "4px",
    paddingTop: "4px",
    height: "35px",
  },
  userProfile:{
    width:"100px",
    cursor: "pointer",
    position:"relative",
    display: "inline-flex",
    '& span':{
      display: "inline-block",
      width:"100%",
      fontSize: "30px",
    }
  }
});

const Header = (props) => {
  
  const classes = useStyles();

  const { 
    handleNavAction,
    headerList
   } = props;

  const isUserLoggedIn = JSON.parse(localStorage.getItem('userData'));

  const [ showProfileBar, setProfile] = useState(false);

  const showUserProfile = (boolVal) => {
    // console.log('boolVal  ==>', boolVal);
    setProfile(boolVal)
    // if(isUserLoggedIn && showProfileBar){
    // }
  };

  console.log(' isUserLoggedIn ', isUserLoggedIn);

  return <div className={ classes.root }>
          <div className={ styles.Header }>
            <div className={classes.logoIcon} onClick={() => handleNavAction('/')}>Trouver</div>
            <div className={ styles.Nav }>
                <div
                  onClick={() => handleNavAction('/travel-details')}
                  className={ styles.NavItem } 
                  key={'Traveller'}>
                  Traveller
                </div>
                {
                  !isUserLoggedIn ? 
                    <>
                    <div
                      onClick={() => handleNavAction('/authentication')} 
                      className={ styles.NavItem } key={'SignUp'}>
                      Sign Up
                    </div>
                    <div
                      onClick={() => handleNavAction('/authentication')} 
                      className={ styles.NavItem } key={'SignIn'}>
                      Sign In
                    </div> </> : ""
                }

                <div
                  onClick={() => handleNavAction('/order')} 
                  className={ clx(styles.NavItem, classes.shopperBtn) } key={'Shopper'}>
                  Shopper
                </div>
                {
                  isUserLoggedIn ?
                  <div
                    onClick = { showUserProfile }
                    className={ clx(classes.userProfile) } > 
                    {/* <span>Profile </span> */}
                    <span><IoIosPerson /></span>
                    {
                      showProfileBar ?
                        <UserProfile
                          handleClick = { showUserProfile }
                        />
                      : ""
                    }
                    <span>
                      { isUserLoggedIn.data.name }
                    </span>
                  </div> : ""
                }
                
            </div>
          </div>
        </div> 
};

export default Header;