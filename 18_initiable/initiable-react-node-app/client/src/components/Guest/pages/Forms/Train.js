import React, { Component } from "react";

import axios from "axios";

export class Train extends Component {
  state = {
    accuracy: null,
    loading: false
  };

  componentDidMount() {

    this.setState({
        loading: true
    })
    axios
      .post("https://practical-sound-30346.pktriot.net/train", {
        type: "classification"
      })
      .then(res => {
        console.log("train res", res);

        this.setState({
          accuracy: res.data.score,
          loading: false
        });
      })
      .catch(err => {
        console.log("train err", err);
      });
  }

  render() {
    return (
      <div>
        <h3>Accuracy</h3>
        {this.state.loading ? (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        ) : this.state.accuracy ? (
          this.state.accuracy
        ) : null}
      </div>
    );
  }
}

export default Train;
