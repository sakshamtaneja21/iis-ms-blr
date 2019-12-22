import React, { useState } from 'react';
import styles from './OrderSec.css';
import Button from "../../components/common/Button/Button";
import {
  useDispatch,
} from 'react-redux';

import Utility from '../../utils/Utility';

const Input = ( props ) => {

  const style = {
  "border": "1px solid #00a699",
  "width": "75%",
  "height": "45px",
  "borderRadius": "4px",
  "paddingLeft": "13px",
}

  return <>
    <input
      onInput= {props.handleChange}
      style={ style }
      type="text"
      placeholder="Paste the url of the product you want to buy"
    />
  </>
};

const primaryBtn = {
  "backgroundColor": "#00a699",
  "color": "#ffffff",
  "fontSize": "18px",
  "margin": "0px 10px",
  "height": "46px",
  "width": "175px",
};

const spanStyles = {
  "display": "inline-block",
  "padding": "0px 40px 0px 0px",
}

const OrderSec = (props) => {
  const [urlVal, setUrl] = useState('');
  const dispatch = useDispatch()
  const handleChange = (event) => {
    if(event && event.target){
      const { value } = event.target;
      setUrl(value);
    }
  };

  const placeOrder = () => {
    if(!urlVal){
      return false;
    }
    
    // const url = "http://192.168.103.79:8080/projectx/product/details";

    fetch(`${Utility.base_api_url}${Utility.product_details}?live_url=${urlVal}`).then(res => res.json())
    .then( res => {
      if(res && res.status == "SUCCESS"){
        dispatch({type:"FETCH_ORDER_DETAILS_SUCCESS",data:res.data});
        props.history.push("/order-details");
      };
    });
    
  }

  return <div className={ styles.OrderSec }>
    <div style={{ "fontSize": "40px"}}  className={ styles.ChildTextItem }>Shop Products from any country and save up to 35%</div>
    <div style={{"padding": "30px 0px 15px 0px"}}className={ styles.ChildTextItem }>
      <span style={spanStyles}>Delivered by trusted travellers</span>
      <span style={spanStyles}>Recieve product in 1 - 2 weeks</span>
    </div>
    <div className={ styles.ChildTextItem }>
      <Input handleChange = { handleChange }/>
      <Button
        onClick={ placeOrder }
        style={ primaryBtn }>Place order</Button>
    </div>
  </div>
};

export default OrderSec;