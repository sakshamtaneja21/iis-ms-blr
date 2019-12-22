import React, { Component } from "react";
import axios from "axios";

export class GetDetails extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    details: [],
    urlFromDb: "",
    loading: false
  };

  componentDidMount() {
    console.log("mount", this.props);

    axios
      .post("http://localhost:5000/api/get/csvurl")
      .then(res => {
        console.log("res", res.data.url[0].url);
        this.setState(
          {
            urlFromDb: res.data.url[res.data.url.length - 1].url
          },
          () => {
            this.setState({
              loading: true
            });
            console.log("csvurl", this.state.urlFromDb);
            axios
              .post(
                "https://practical-sound-30346.pktriot.net/get_data_details",
                {
                  csvurl: this.state.urlFromDb
                }
              )
              .then(res => {
                console.log("details", res.data);
                this.setState(
                  {
                    loading: false,
                    details: res.data
                  },
                  () => {
                    this.props.getDetails(this.state);
                  }
                );
              })
              .catch(err => console.log("details err", err));
          }
        );
      })
      .catch(err => console.log("err", err));
  }

  render() {
    console.log("details", this.state.details);
    let keys = this.state.details ? Object.keys(this.state.details) : null;
    let th = keys.map(key => <tr><th>{key}</th></tr>);

    let tdvals = Object.values(this.state.details).map(detail => {
      return (
        <tr>
          {detail.map(val => (
            <td>{val}</td>
          ))}
        </tr>
      );
    });

    return (
      <div>
        {this.state.loading ? (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        ) : (
          <table className="ui celled table" style={{marginTop:"20px"}}>
            {th}

            {tdvals}
          </table>
        )}
      </div>
    );
  }
}

export default GetDetails;
