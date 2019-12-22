import React, { useEffect, useState } from 'react';
import TripHeader from '../../components/TripHeader/TripHeader';
import TripDetail from '../../components/TripDetail/TripDetail';
import {useSelector,useDispatch} from 'react-redux';
import { Grid } from '@material-ui/core';
import Utility from '../../utils/Utility';
import { withRouter } from "react-router-dom";
import Order from '../../components/Order/Order';

const Orders = () => {

  const dispatch = useDispatch();
  // Subscribing store
  const ordersList = useSelector( state => {
    return state.orders_list;
  });

  const [isofferAccepted, setOfferAcceptance] = useState(false);

  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem('userData'));
  //   const { user_id } = userData && userData.data;
  //   fetch(`${Utility.base_api_url}${Utility.fetch_orders}`,{
  //     method: "post",
  //     body: JSON.stringify({"user_id":user_id})
  //   }).then(res => res.json())
  //   .then( res => {
  //     dispatch({type:"FETCH_LIST_ORDERS",data:res.orders_lst});
  //     // props.history.push("/orders_list");
  //     // console.log('res', res);
  //   }).then( err => console.log('Error ==>', err));
  // }, [])

  const handleAccept = () => {
    setOfferAcceptance(true);
  }
  
  return <>

      {
        isofferAccepted ?     <Grid>
          Offer Accepted 
        </Grid> : 
        ordersList && ordersList.map( orderItem => {
          return <Order handleAccept={ handleAccept } key={ orderItem.order_id} {...orderItem}/>
        })
      }
  </>
}

export default withRouter(Orders);
