import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Tabs,
  Tab,
  Grid,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Utility from "../../utils/Utility";

const styles = {
  width:"600px",
  height: "",
};

const useStyles = makeStyles({
  root:{
    height:"600px"
  }
});

const Auth = (props) => {
  const { 
    isSignin,
  } = props;


  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isOpen, setOpen] = useState(true);

  let userData = {

  };

  const handleClose = () => {
    setOpen(false);
    props.history.push('/');
  };

  const handleChange = (event) => {

    if(event && event.target){
      const { name, type, value } = event.target;
      userData[name] = value;
      console.log('App changes', name, type, value);
    }
    
  }

  const handleSubmit = () => {
    const url = value ? `${Utility.base_api_url}${Utility.signin}` : `${Utility.base_api_url}${Utility.singup}`;
    fetch(url,{
      method: 'post',
      body: JSON.stringify(userData)
    }).then(res => res.json())
    .then(res => {
      if(value && res.status == "SUCCESS"){
        localStorage.setItem('userData', JSON.stringify(res));
        props.history.push('/');
      }else{
        setValue(1)
      }
    });
  };

  return <Dialog
            className={ classes.root }
            open={ isOpen }
            onClose={ handleClose }
            aria-labelledby="draggable-dialog-title">
            <DialogTitle>
              <Tabs
                value={value}
                onChange={ (event, newVal) =>  setValue(newVal)}
                indicatorColor="primary"
                textColor="primary"
                centered >
                <Tab label="SignUp"></Tab>
                <Tab label="SignIn"></Tab>
              </Tabs>
              {/* { isSignin ? "SignUp" : "Signin" } */}
            </DialogTitle>
            <DialogContent style = { styles }>
              {
                value ? 
                  <SignIn 
                    handleChange = { handleChange }
                    /> 
                : 
                  <SignUp
                    handleChange = { handleChange }
                  />}
            </DialogContent>
            <Grid style={{ "justifyContent":"center","textAlign":"center"}}>
              <Button onClick={handleSubmit}>Sumbit</Button>
            </Grid>
        </Dialog>
};

const SignUp = (props) => {
  // const { handleChange }
  return <FormControl 
          style={{"width":"80%"}} 
          onChange = { props.handleChange }
        >
    <Input name="name" style={{"margin": "10px"}} type="text" placeholder="Name"/>
    <Input name="email" style={{"margin": "10px"}} type="text" placeholder="Email"/>
    <Input name="phone" style={{"margin": "10px"}} type="text" placeholder="Phone"/>
    <Input name="password" style={{"margin": "10px"}} type="password" placeholder="Password"/>
  </FormControl>
};

const SignIn = (props) => {
  return <FormControl style={{"width":"80%"}} onChange = { props.handleChange }>
    <Input style={{"margin": "10px"}} name="phone" type="phone" placeholder="Phone Number"/>
    <Input style={{"margin": "10px"}} name="password" type="password" placeholder="Password"/>
  </FormControl>
};

export default withRouter(Auth);