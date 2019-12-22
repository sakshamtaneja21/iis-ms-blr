import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Utility from '../../utils/Utility';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "200px",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    left: "0",
    boxShadow: "0px 0px 1px",
    backgroundColor: "#f6f6f6",
    height: "250px",
    top:"50px",
  },

  userItem:{
    fontSize:"20px",
  }
});

const UserProfile = (props) => {
  
  const classes  = useStyles();

  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem('userData'));

  const { user_id } = userData && userData.data;


  // Get trips 
  const getTrips = () => {
    
    // // localStorage.getItem('userData')
    // fetch(`${Utility.base_api_url}${Utility.fetch_trips}`,{
    //   method: "post",
    //   body: JSON.stringify({"user_id":user_id})
    // }).then(res => res.json())
    // .then( res => {
    //   // console.log('res', res, res["orders_lst"] );
    //   dispatch({type:"FETCH_LIST_TRIPS",data:res.trips_lst})
    //   props.history.push("/trips_list");
    // });
    props.history.push("/trips_list");
    props.handleClick(false);
  };

  const getOrders = () => {
    localStorage.getItem('userData')
    fetch(`${Utility.base_api_url}${Utility.fetch_orders}`,{
      method: "post",
      body: JSON.stringify({"user_id":user_id})
    }).then(res => res.json())
    .then( res => {
      dispatch({type:"FETCH_LIST_ORDERS",data:res.orders_lst});
      props.history.push("/orders_list");
      // console.log('res', res);
    });
    props.history.push("/orders_list");
    props.handleClick(false);
  };
  const getLogout = () => {
    localStorage.removeItem('userData');
    props.handleClick(false);
    props.history.push('/');
  }
  return <Grid container spacing={2} className={ classes.root }>
    {/* <Grid item className={ classes.userItem }>Addresses</Grid> */}
    <Grid item className={ classes.userItem } onClick={ getTrips }>Trips</Grid>
    <Grid item className={ classes.userItem } onClick={ getOrders }>Orders</Grid>
    <Grid item className={ classes.userItem } onClick={ getLogout }>Logout</Grid>
  </Grid>  
};


export default withRouter(UserProfile); 