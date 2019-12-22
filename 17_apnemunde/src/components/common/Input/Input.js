import React from 'react';

const Input = ( props ) => {
  const {
    handleChange,
    placeholderText,
    val,
  } = props;

  const style = {
    "width": "75%",
    "height": "45px",
    "borderRadius": "4px",
    "paddingLeft": "13px",
    "border": "0",
    "backgroundColor": "#ecebeb",
    "fontSize": "1em",
  };

  return <>
    <input
      value = { val }
      onChange= {handleChange}
      style={ style }
      type="text"
      placeholder={ placeholderText }    
    />
  </>
};

export default Input;