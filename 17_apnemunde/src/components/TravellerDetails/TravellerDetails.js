import React from 'react';
// import TravellerDetails from '../../container/TravellerDetails/TravellerDetails';

import MyImage from '../../public/images/phuket.jpg';
import { Grid, Input, Button, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clx from "classnames";
import Utility from '../../utils/Utility';
import { withRouter } from "react-router-dom";

const BgImageStyles = {
  background: `url(${MyImage})`,
  height: "600px",
  backgroundSize: "100% 600px",
  backgroundRepeat: "no-repeat",
  color:"#ffffff",
};

const useStyles = makeStyles({
  bgImageStyles: {
    background: `url(${MyImage})`,
    height: "1200px",
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
    color:"#ffffff",
  },
  root:{
    padding:"20px"
  },
  flexItem:{
    flexBasis: "50%"
  },
  travelBookingSec: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius:"4px",
    padding:"30px 10px",
    "& .MuiInput-root":{
      width: "90%",
      height: "35px",
      margin: "10px"
    },
    "& .MuiButtonBase-root":{
      padding: "6px 8px",
      backgroundColor: "#00a699",
      width: "90%",
      color: "#ffffff",
      height: "40px",
      marginTop: "20px",
    }
  },
  addTripSec:{
    '& label':{
      color: "#000000",
    }
  },
  addTripText:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
});

let tripData = {};


const TravelDetails = (props) => {

  const classes = useStyles();

  const addTrip = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const jsnData = {
      "user_id": userData.data.user_id,
      "source_addr_id": 3,
      "destination_addr_id": 2,
      "departure_date": tripData['departure_date'],
      "arrival_date": tripData['arrival_date']
    };

    fetch(`${Utility.base_api_url}${Utility.add_trip}`,{
      method: 'post',
      body: JSON.stringify(jsnData)
    }).then(res => res.json(jsnData))
    .then(res => {
      if(res && res.status == "SUCCESS"){
        props.history.push('/trips_list');
      }
      console.log('res ===>', res)
    });
  }

  const handleChange = (event) => {
    if(event && event.target){
      const {name,type,value } = event.target;
      tripData[name] = value;
      console.log('name,type,value ==>', name,type,value);
    }
  }

  return <>
    <div className ={ classes.bgImageStyles }>
      <Grid container className = { classes.root }>
        <Grid item className={ clx(classes.flexItem, classes.addTripText) }>
          <h1>Earn $200+ USD every time you travel abroad</h1>
          <p>Deliver products to international shoppers and cut your travel costs in half.</p>
        </Grid>
        <Grid item className={ clx(classes.flexItem,classes.travelBookingSec)}>
          <p>Add your trip details to start earning money.</p>
          <FormControl 
            style={{"width":"80%"}} 
            onChange = { handleChange }
            className ={ classes.addTripSec }
            >
            <div>
              <label for="from">From : </label>
              <Input name="from" label="Standard" style={{"margin": "10px"}} type="text" placeholder="Enter source address "/>
            </div>
            
            <label for="from">To : </label>
            <Input name="to" style={{"margin": "10px"}} type="text" placeholder="Enter destination address"/>
            <label for="from">Departure Date : </label>
            <Input name="departure_date" style={{"margin": "10px"}} type="date" placeholder="Departure Date"/>
            <label for="from">Arrival Date : </label>
            <Input name="arrival_date" style={{"margin": "10px"}} type="date" placeholder="Arrival Date"/>
          </FormControl>

          {/* <Input placeholder="From"/>
          <Input placeholder="To"/>
          <Input type="date" placeholder="Departure Date" />
          <Input type="date" placeholder="Arrival Date" /> */}

          <Button onClick={ addTrip }> Add Trip</Button>
        </Grid>
      </Grid>
    </div>
    </>
}
export default withRouter(TravelDetails);

