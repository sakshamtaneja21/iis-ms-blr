import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import styles from './OrderDetails.css';
import { useSelector } from 'react-redux';
import clx from "classnames";
import Input from "../../components/common/Input/Input";
import { useDispatch } from "react-redux";
import Utility from '../../utils/Utility';
import { IoIosRefresh } from "react-icons/io"

const useStyles = makeStyles({
  root:{
    maxWidth: "1024px",
    padding: "20px",
    height: "auto",
    margin: "0 auto",
  },
  orderTrackSec:{
    flexBasis:"100%",
    height:"100px",
    margin: "0",
  },
  orderReview:{
    flexBasis:"63%",
    margin: "0",
    display:"flex",
    flexDirection:"column",
    boxShadow: "0px 0px 1px 0px",
    borderRadius: "4px",
  },
  orderedLocation:{
    flexBasis: "33%",
    margin: "0 1%",
    boxShadow: "0px 0px 1px 0px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    height:"380px",
    '.MuiGrid-item':{
      flexBasis:"40%",
    },
    '& button':{
      color: "#ffffff",
      backgroundColor: "#00a699",
      height: "40px",
      borderRadius: "4px",
      marginLeft: "10px",
    },
  },
  heading:{
    fontSize: "1.8em" 
  },
  imageSec:{
    '& img':{
      width: "120px"
    }
  },
  labelText: {
    fontSize:"1em",
    fontWeight: "600"
  },
  productValue:{
    height:"25px",
    backgroundColor:"#e8e5e5",
    borderRadius: "8px",
    padding: "10px",
    paddingLeft: "40px",
  },
  inputUrl:{
    width: "100%",
    border: "0",
    height: "60px",
    '&:hover':{
      border:"0"
    }
  },
  refreshBtn: {
    color: "#ffffff",
    backgroundColor: "#00a699",
    height: "40px",
    borderRadius: "4px",
    marginLeft: "10px",
  },
  productAddress:{

  }
});


const OrderDetails = (props) => {
  const classes = useStyles();

  const [ isOrderCreated, setOrderStatus] = useState(false);

  const orderDetails = useSelector( state => {
    return state.orderDetails;
  });

  const dispatch = useDispatch();

  const {
    currency,
    description,
    image_url,
    live_url,
    price,
    title,
    sourceAddress= "United States of America",
    destination= "Bengaluru, India",
    id,
  } = orderDetails;

  const [url, setUrl] = useState('');

  const handleInputChange = (event) => {
    if(event && event.target){
        setUrl(event.target.value);
      // dispatch({type: "URL_EDIT_CHANGE", url: event.target.value })
      console.log(event.target.value);
    }

  }

  const getProductDetails = () => {
    fetch(`${Utility.base_api_url}${Utility.product_details}?live_url=${url}`).then(res => res.json())
    .then( res => {
      if(res && res.status == "SUCCESS"){
        dispatch({type:"FETCH_ORDER_DETAILS_SUCCESS",data:res.data});
        setOrderStatus(true);
        // props.history.push("/order-details");
      };
    });
  }

  const createNewOrder = () => {
    
    const userData = JSON.parse(localStorage.getItem('userData')).data;

    const {
      user_id,
      address_lst,
    } = userData;

    const jsonInput = {
      "user_id": user_id, 
      "form_country": "USA",
      "to_country": "IND",
      "source_address_id": 1,
      "dest_address_id" : 2,
      "currency": "USD",
      "delivery_by": "2019-12-26",
      "products" : [
          {
              "product_id" : id,
              "quantity" : 1,
              "price" : price,
          }
      ]
    };

    fetch(`${Utility.base_api_url}${Utility.create_order}`,{
      method: 'post',
      body:JSON.stringify(jsonInput)
    }).then(res => res.json())
    .then( res => {
      if(res && res.status == "SUCCESS"){
        dispatch({type:"CREATE_ORDER_SUCCESSFULL"});
        setOrderStatus(true);
        // props.history.push("/order-details");
      };
    });
  }

  console.log('orderDetails ==> ', orderDetails);

  return <>
    {
      isOrderCreated ? <Grid style={{ 
        "textAlign":"center",
        "padding":"40px",
        "color": "#00a699",
        "fontSize": "30px" }}>{"Order placed Successfully, Travellers travelling to your destination has been notified."}</Grid> :
      <Grid container spacing={4} className={ classes.root }>
      <Grid container spacing={4} className={ classes.orderTrackSec }>
        <Grid item>
        </Grid>
      </Grid>
      <Grid container spacing={4} className={ classes.orderReview }>
        <Grid item>
          <Typography className={ classes.heading }>1. Review Product Details </Typography>
        </Grid>
        <Grid item>
          <Typography className={ classes.labelText }> URL Link : </Typography> 
          <Input
              handleChange = { handleInputChange }
              className={ clx(classes.productValue, classes.inputUrl) }
              val = { url ? url : live_url }
            />
          <Button
            onClick = { getProductDetails }
            className={ classes.refreshBtn }>Refresh</Button>
        </Grid>
        <Grid item>
          <Typography className={ classes.labelText }> Description : </Typography>
          <Typography className={ classes.productValue }> { description } </Typography>
        </Grid>
        <Grid item className={ classes.imageSec }>
          <Typography className={ classes.labelText }> Image :  </Typography>
          <Typography> <img src={image_url} alt="Product Image"/> </Typography>
        </Grid>
        <Grid item>
          <Typography className={ classes.labelText }> Price : </Typography>
          <Typography className={ classes.productValue }> { `${currency}${price}` } </Typography>
        </Grid>
        <Grid item>
          <Typography className={ classes.labelText }> Quantity :  </Typography>
          <Typography className={ classes.productValue }> { 1 } </Typography>
        </Grid>
    </Grid>
      <Grid container spacing={4} className={ classes.orderedLocation } >
        <Grid item>
          <Typography > {title}</Typography>
        </Grid>
        <Grid item>
          <Typography className={ classes.productAddress } > {`From : ${sourceAddress}`}</Typography>
        </Grid>
        <Grid item>
          <Typography className={ classes.productAddress } > { `To : ${destination}` }</Typography>
        </Grid>
        <Grid item>
          <Typography className={ classes.labelText }> Product Price : </Typography>
          <Typography className={ classes.productAddress }> { `${currency}${price}` } </Typography>
          <Typography className={ classes.productAddress }> { `Pay in INR : ${ price * 75 }` } </Typography>
        </Grid>
        <Grid item>
          <Button onClick = { createNewOrder }>Place Order </Button>
        </Grid>
      </Grid>
    </Grid>
    }
  </>
};
export default OrderDetails;