import React, { Component } from "react";
import axios from "axios";

export class Analyze extends Component {
  checkedValues = [];
  constructor(props) {
    super(props);
  }

  state = {
    imageUrls: null,
    isChecked: false,
    xselect: null,
    yselect: null,
    loading: false
  };

  toggleChange = e => {
    this.checkedValues.push(e.target.name);
  };

  onRadioChange = e => {
    this.checkedValues.push(e.target.value);
  };

  componentDidMount() {
    console.log("props", this.props.details);

    this.setState({
      loading: true
    });

    axios
      .post(
        "https://practical-sound-30346.pktriot.net/univariate_analysis",
        this.props.details
      )
      .then(res => {
        console.log("analyze res", res.data);

        this.setState({
          imageUrls: res.data.image_urls,
          loading: false
        });
      })
      .catch(err => console.log("analyze err", err));
  }

  onClickHandle = () => {
    this.setState({
      loading: true
    });
    axios
      .post("https://practical-sound-30346.pktriot.net/scale_transform", {
        features: this.checkedValues,
        csvurl: this.props.details.csvurl
      })
      .then(res => {
        this.setState({
          loading: false
        });
        console.log("submit res", res.data);
      })
      .catch(err => console.log("submit err", err));
  };

  render() {
    let images = this.state.imageUrls
      ? this.state.imageUrls.map((url, index) => {
          return <img key={index} src={url} height="400px" width="auto" />;
        })
      : null;

    let xCheckBoxes = this.props.details.details.details.columns.map(
      (column, index) => {
        return (
          <div key={index}>
            <label>{column}</label>
            <input
              type="checkbox"
              onChange={this.toggleChange}
              name={`x${column}`}
            />
            <div onChange={this.onRadioChange}>
              <input type="radio" value="categorical" name="type" />
              Categorical
              <input type="radio" value="numerical" name="type" />
              Numerical
              <input type="radio" value="date/time" name="type" />
              Date/Time
            </div>
            <br />
          </div>
        );
      }
    );
    let yCheckBoxes = this.props.details.details.details.columns.map(
      (column, index) => {
        return (
          <div>
            <label>{column}</label>
            <input
              type="checkbox"
              name={`y${column}`}
              onChange={this.toggleChange}
              key={index}
            />
            <div onChange={this.onRadioChange}>
              <input type="radio" value="categorical" name="type" />
              Categorical
              <input type="radio" value="numerical" name="type" />
              Numerical
              <input type="radio" value="date/time" name="type" />
              Date/Time
            </div>
            <br />
          </div>
        );
      }
    );

    return (
      <div>
        {this.state.loading ? (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        ) : (
          <div>{images}</div>
        )}

        <div className="ui equal width grid">
          <div className="row">
            <div className="column">X-columns{xCheckBoxes}</div>
            <div className="column">Y-columns{yCheckBoxes}</div>
          </div>

          <button style={{ marginLeft: "400px" }} onClick={this.onClickHandle}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Analyze;
