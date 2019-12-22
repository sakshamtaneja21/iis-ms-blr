import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GuestHeader from './components/Guest/Header/GuestHeader';
import AdminHeader from './components/Admin/Header/AdminHeader';
import Footer from './components/Footer';
import Home from './components/Guest/pages/Home/Home';
import RegistrationForm from './components/Guest/pages/Register/RegistrationForm';

import Login from './components/Admin/pages/Login/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      role: null
    };

    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        isAuthenticated: true,
        role: localStorage.getItem('role')
      });
    }
  }

  handleAuthentication = (boolean, string) => {
    this.setState({
      isAuthenticated: boolean,
      role: string
    });
  };
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          {this.state.isAuthenticated && this.state.role === 'admin' ? (
            <AdminHeader />
          ) : (
            <GuestHeader />
          )}
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/register" component={RegistrationForm} />

            <Route
              path="/login"
              render={props => {
                return (
                  <Login
                    {...props}
                    handleAuthentication={this.handleAuthentication}
                  />
                );
              }}
            />

            <Route
              path="/logout"
              render={props => {
                axios
                  .delete('/api/users/logoutALL', {
                    headers: {
                      'x-auth': localStorage.getItem('token')
                    }
                  })
                  .then(response => {
                    props.history.push('/');

                    this.setState(() => ({
                      isAuthenticated: false
                    }));

                    localStorage.clear();
                  });
              }}
            />

            {/* <Route exact={true} path="/events/:_id" component={EventPage} /> */}
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
