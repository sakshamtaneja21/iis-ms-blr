import React from 'react';
import Button from '../../components/common/Button/Button';
import styles from "./MainContent.css";
import { withRouter } from "react-router-dom";

const primaryBtn = {
  "backgroundColor": "#00a699",
  "color": "#ffffff",
  "fontSize": "18px",
  "margin": "0px 10px",
};

const pStyle = {
  "fontSize":"20px", 
  "padding":"20px", 
  "color":"#8f8f95",
  "width": "48%",
  "textAlign": "center",
};

const MainContent = (props) => {
  return <div className={ styles.MainContent }>
        <div className={ styles.MainHeading }>Shop anywhere in the world and travel </div>
        <p style={pStyle}>At Trouver, our vision is to break down borders so that everyone can enjoy their favorite products, no matter what city they call home.</p>
        <div className={ styles.BtnGroup }>
          <Button
            onClick= { () => {
              props.history.push("/order")
            }}
            style={ primaryBtn } 
            className={ styles.Btn } >Order with us </Button>
          <Button onClick= { () => {
              props.history.push("/travel-details")
            }} className={ styles.Btn } style={{"border": "1px solid #00a699", "fontSize": "18px"}}>Travel with us </Button>
        </div>
  </div>;
};

export default withRouter(MainContent);