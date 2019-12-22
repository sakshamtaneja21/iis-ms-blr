import React, { useEffect } from 'react';
import TripHeader from '../../components/TripHeader/TripHeader';
import TripDetail from '../../components/TripDetail/TripDetail';
import {useSelector,useDispatch} from 'react-redux';
import { Grid } from '@material-ui/core';
import Utility from '../../utils/Utility';

const Trips = () => {

  const dispatch = useDispatch();
  // Subscribing store
  const tripsList = useSelector( state => {
    return state.trips_list;
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { user_id } = userData && userData.data;
    fetch(`${Utility.base_api_url}${Utility.fetch_trips}`,{
      method: "post",
      body: JSON.stringify({"user_id":user_id})
    }).then(res => res.json())
    .then( res => {
      dispatch({type:"FETCH_LIST_TRIPS",data:res.trips_lst})
      // props.history.push("/trips_list");
    }).catch( err => console.log('eroor', err));
  }, [])

  console.log('tripsList', tripsList)
  // D

  return <>
    <TripHeader />
    <Grid style={
      {
        padding:"20px 0",
        paddingLeft:"20%",
        fontSize:"1.6em"
      }
    }>
      Upcoming Trips
    </Grid>
    {
      tripsList && tripsList.map( tripItem => {
        return <TripDetail key={ tripItem.user_id } { ...tripItem } />
      })
    }
    {
      (tripsList && tripsList.length == 0 )? <Grid style={{"textAlign": "center","fontSize": "30px","color": "#ef3b3b"}}>No upcoming trips found</Grid> : ""
    }
  </>
};

export default Trips;