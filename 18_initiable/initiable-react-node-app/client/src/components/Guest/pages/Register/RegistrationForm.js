import React from 'react';
import axios from 'axios';
class ReigstrationFOrm extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      mobile: ''
    };
  }

  handleChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    // if I use this it works
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      password: this.state.password,
      email: this.state.email,
      mobile: this.state.mobile
    };

    axios
      .post('/api/users/register', formData)
      .then(response => {
        this.handleSubmit(response.data);

        this.setState(() => ({
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          email: '',
          mobile: ''
        }));
      })
      .catch(err => {
        console.log(err);
      });
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
                Register
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="ui segment">
                <form className="ui form">
                  <div className="field">
                    <label>First Name</label>
                    <input
                      placeholder="First Name"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      name="firstName"
                    />
                  </div>

                  <div className="field">
                    <label>Last Name</label>
                    <input
                      placeholder="Last Name"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      name="lastName"
                    />
                  </div>

                  <div className="field">
                    <label>User Name</label>
                    <input
                      placeholder="Username"
                      type="text"
                      value={this.state.userName}
                      onChange={this.handleChange}
                      name="userName"
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

                  <div className="field">
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      name="email"
                    />
                  </div>

                  <div className="field">
                    <label>Contact Number</label>
                    <input
                      placeholder="Contact Number"
                      type="text"
                      value={this.state.mobile}
                      onChange={this.handleChange}
                      name="mobile"
                    />
                  </div>

                  <button
                    type="submit"
                    className="ui button"
                    onClick={e => this.handleSubmit(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReigstrationFOrm;
