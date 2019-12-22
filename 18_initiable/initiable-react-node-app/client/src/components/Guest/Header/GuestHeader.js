import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import './GuestHeader.css';

class GuestHeader extends React.Component {
  render() {
    const HeaderStyle = {
      backgroundColor: '#3393ff',
      width: '100%',
      height: 48,
      position: 'fixed',
      margin: 0,
      top: 0,
      zIndex: '100'
    };
    const MenuStyle = {
      display: 'flex-inline',
      textAlign: 'right'
    };
    return (
      <div style={HeaderStyle} className="ui equal width height grid">
        <div className="column">
          <div>App Name</div>
        </div>
        <div style={MenuStyle} className="column">
          <div>
            
            <Link to="/"><div className="home">Home</div></Link>
            <Link to="/register">Register</Link>

            <Link to="/login">Login</Link>

            <Dropdown text="DropDown">
              <Dropdown.Menu direction="left">
                <Dropdown.Item>
                  <Link to="/">Option 1</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/">Option 2</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/">Contact Us</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestHeader;
