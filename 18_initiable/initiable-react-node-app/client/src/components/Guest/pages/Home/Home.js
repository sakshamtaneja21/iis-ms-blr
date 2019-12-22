import React from "react";
import FromNav from '../Forms/FormNav';
var styleObj = {
  fontSize: 80,
  paddingTop: 120,
  paddingLeft: 60
};


class Home extends React.Component {
  render() {
    return (
      <div>
        <center style={{marginTop:'100px'}}>
        <FromNav />

        </center>
      </div>
    );
  }
}

export default Home;
