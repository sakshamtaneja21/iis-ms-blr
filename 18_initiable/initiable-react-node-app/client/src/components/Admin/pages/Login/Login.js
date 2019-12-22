import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
    };
  }

  handleSubmitUser = e => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/api/users/login', formData).then(response => {
      if (response.data.errors) {
        this.setState(() => ({
          errors: response.data.errors,
          password: ''
        }));
      } else {
        // write this to localStorage
        const tokenData = jwt_decode(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', tokenData.roles);
        // redirect to contacts page
        this.props.history.push('/');
        // change the navigation links = update the state of isAuthenticated in the parent component
        this.props.handleAuthentication(true, tokenData.roles);
      }
    });
  };

  handleChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value
    }));
  };

  render() {
    const container = {
      marginTop: '58px',
      marginBottom: '70px',
      marginRight: '10px',
      marginLeft: '10px',
      width: '100%',
      display: 'flex',
      // flexWrap: 'wrap',
      justifyContent: 'center'
    };
    return (
      <div style={container}>
        <div className="ui equal width grid">
          <div className="row">
            <div className="column">
              <div
                style={{ fontWeight: 'bold', textAlign: 'center' }}
                className="ui segment"
              >
                Login
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="ui segment">
                <form className="ui form">
                  <div className="field">
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      type="text"
                      value={this.state.email}
                      onChange={this.handleChange}
                      name="email"
                    />
                  </div>

                  <div className="field">
                    <label>Password</label>
                    <input
                      placeholder="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      name="password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="ui button"
                    onClick={this.handleSubmitUser}
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="row">
                <div className="column">
                  <div
                    style={{ fontWeight: 'bold', textAlign: 'center' }}
                    className="ui segment"
                  >
                    {this.state.errors && <p>{this.state.errors}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
