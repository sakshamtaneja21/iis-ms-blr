import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import clx from 'classnames';

const useStyles = makeStyles({
  root:{
    padding:"0",
    display:"flex",
    maxWidth:"800px",
    margin: "0 auto",
    padding: "15px",
    textAlign:"center",
    '& img':{
      width: "130px",
    },
    marginTop: "40px",
    boxShadow:"0px 0px 1px",
    cursor:"pointer"
  },
  childCls:{
    height:"170px",
    alignItems: "center",
  },
  orderDetail:{
    flexBasis: "70%",
    '& p':{
      fontSize: "1.2em",
      color: "#585858",
    },
    '& h2':{
      margin:"20px 0px"
    }
  }
});

const Order = (props) => {
  
  const classes = useStyles();

  const {
    currency,
    destination_city,
    expected_delivery,
    image_url,
    order_id,
    price,
    product_id,
    source_city,
    title,
    order_price,
    traveler_reward,
    delivery_by,
  } = props;



  // const handleAccept = () => {

  // }

  return <Grid container className={ classes.root }>
          <Grid item style={{"flexBasis": "20%"}} className={classes.childCls}> 
            <img src = { image_url } alt="Order image" />
          </Grid>
          <Grid item className={ clx(classes.orderDetail,classes.childCls) }>
            <p >
              {
                `${title} deliver to ${destination_city} from ${source_city} before ${delivery_by}`
              }
            </p>
              <h2 >
                {`Travller reward - ${currency}${traveler_reward}` }
              </h2>
              <Grid style={{"textAlign":"right"}} onClick={ props.handleAccept }> 
                <Button style={{backgroundColor: "#00a699","color": "#fff"}}>Accept offer</Button>
              </Grid>
          </Grid>

        </Grid>
};

export default Order;