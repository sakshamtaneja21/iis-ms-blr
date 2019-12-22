import React from 'react';
// import Logo from '';

class Footer extends React.Component {
  render() {
    var style = {
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E7E7E7',
      position: 'fixed',
      bottom: 0,
      margin: 0,
      height: '60px',
      width: '100%'
    };

    return (
      <div style={style} className="ui equal width height grid">
        <div
          style={{ textAlign: 'right', paddingTop: 0, paddingRight: 0 }}
          className="column"
        >
          {/* <img src={Logo} alt="" />
        </div>
        <div
          style={{ textAlign: 'left', verticalAlign: 'middle', paddingLeft: 0 }}
          className="column"
        > */}
          <div>
            <p>
              initiable.com &copy; {new Date().getFullYear()}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
