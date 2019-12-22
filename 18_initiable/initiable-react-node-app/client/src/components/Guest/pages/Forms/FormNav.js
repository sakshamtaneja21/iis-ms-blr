import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Upload from "./Upload";
import GetDetails from "./GetDetails";
import Train from "./Train";
import Analyze from "./Analyze";

import './FormNav.css'

export default class FromNav extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    type: 'date',
    col_name: '',
    csvurl:'',
    details:''
  }

  getDetails = (details) => {
    console.log('details', details)

    this.setState({
      col_name: details.details.date_column.length > 0 ? details.details.date_column[0].length : null,
      csvurl: details.urlFromDb,
      details: details
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/">Upload</Link>
           | 

          <Link to="/getdetails">Get Details</Link> | 

          <Link to="/analyze">Analyze</Link> |

          <Link to="/train">Train</Link>

          <Switch>
            <Route exact path="/">
              <Upload />
            </Route>
            <Route path="/getdetails">
              <GetDetails getDetails={this.getDetails}/>
            </Route>
            <Route path="/analyze">
              <Analyze details={this.state}/>
            </Route>
            <Route path="/train">
              <Train/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
