import React from 'react';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import clx from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { IoIosAirplane } from 'react-icons/io';
import Utility from "../../utils/Utility";
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "600px",
    margin: "10px auto",
  },
  travelLocation: {
    width: "60%",
    display: "inline-flex",
    fontSize: "20px",
    padding: "0px 20px",
  }
});

const TripDetail = (props) => {
  const dispatch = useDispatch();
  console.log('props in trip detail', props);

  const classes = useStyles();
  const { 
    trip_source_city, 
    trip_destination_city, 
    arrival_date, 
    departure_date,
    trip_id,
    // orders, 
    // delevers,
    // earnings,
  } = props;

  const getOrdersForTrip = () => {
    fetch(`${Utility.base_api_url}${Utility.get_trip_orders}`,{
      method: "post",
      body:JSON.stringify({"trip_id": trip_id})
    }).then(res => res.json())
    .then(res => {
      if(res && res.status == "SUCCESS"){
        props.history.push('/orders_list');
        dispatch({type:"FETCH_TRIP_LIST_ORDERS",data:res.order_lst});
      };
      console.log('res ==>', res);

    });
  }

  return <>
    <Card className={ classes.root}>
      <CardContent onClick={ getOrdersForTrip }>
        <Grid container spacing={2} className={ classes.root }>
          <Grid item className={ classes.travelLocation }>
            <span>{ trip_source_city }</span>
            <span style={{ "padding": "0px 20px"}}><IoIosAirplane></IoIosAirplane></span>
            <span> { trip_destination_city }</span>
          </Grid>
          <Grid item>
            <Typography>
              <span>{'Departue Date: ' }</span>
              <span>{ departure_date }</span>
            </Typography>
            <Typography>
              <span>{'Arrival Date: ' }</span>
              <span>{ arrival_date }</span>
            </Typography>

          </Grid>
          {/* <Grid item>
            <div>
              <p>{ orders }</p>
              <p>ORDERS</p>
            </div>
            <div>
              <p>{ delevers }</p>
            <p>TO DELIVER</p>
            </div>
            <div>
              <p>{ earnings }</p>
              <p>EARNINGS</p>
            </div>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card> 
  </>
}

export default withRouter(TripDetail);