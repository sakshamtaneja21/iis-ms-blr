import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import Button from "../../components/common/Button/Button";
import styles from './ProductDetails.css';

const data = [
  {
    "heading": "Tell us what you are trying to Buy",
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    "heading": "Tell us what you are trying to Buy",
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    "heading": "Tell us what you are trying to Buy",
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    "heading": "Tell us what you are trying to Buy",
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  }
];

const headerStyle = {
  "fontSize":"40px",
};

const ProductDetails = (props) => {
  // const [isShopper, setUser] =

  const [isShopper, setUserType] = useState(true);

  const activeUserTypeStyle = {
    color: "#00a699",
    borderBottom:"1px solid #00a699"
  };
  

  return <div className={ styles.ProductDetails }>
    <div style={ headerStyle }>How it Works</div>
    <div style={{"margin":"20px","borderBottom": "1px solid #b2b2b2"}}>
      <Button 
        style={ isShopper ? activeUserTypeStyle : {} }
        onClick = { () => !isShopper ? setUserType(true) : "" } >
        For Shoppers
      </Button>
      <Button 
        style={ isShopper ? {} : activeUserTypeStyle }
        onClick = { () => isShopper ? setUserType(false) : "" } >
        For Travelers
      </Button>
    </div>
    <div style={{"fontSize": "24px","padding": "40px"}}> At Trouver, our vision is to break down borders so that everyone can enjoy their favorite products, no matter what city they call home.</div>
      {
        data.map( (step, index ) => <Paper className={ styles.ProductStep } key={`${step.heading}${index}`}> 
          <div style={{"fontSize":"40px"}}>{step.heading}</div>
        <div style={{"padding":" 20px 20px 40px 20px"}}>{step.text}</div>
        </Paper>)
      }
  </div>
};

export default ProductDetails;