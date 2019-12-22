import React from 'react';
import { Button } from '@material-ui/core';
import styles from './Button.css';

const ButtonComp = (props) => {
  return <Button
          className={ styles.Button }
          { ...props }>
            {props.children}
        </Button>;
};

export default ButtonComp;