import React from 'react';
import {
  Grid,
  Button
} from '@material-ui/core';
import clx from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding:"0",
    height: "150px",
    margin: "0 auto",
    padding: "55px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderBottom: "1px solid #cecece",
  },
  addTripBtn:{
    width: "140px",
    textAlign: "center",
    '& button':{
      backgroundColor: "#00a699",
      color:"#ffffff",
    }
  }

});

const TripDetail = (props) => {
  const classes = useStyles();
  const addTripDetail = () => {
    props.history.push('/travel-details');
    // console.log('')
  };

  return <> 
    <Grid container spacing={2} className={ classes.root }>
      <Grid item style={{"fontSize":"2em"}}>Trips</Grid>
      <Grid item className={ classes.addTripBtn }>
        <Button onClick={ addTripDetail }>Add Trip</Button>
      </Grid>
    </Grid>
  </>
}

export default withRouter(TripDetail);