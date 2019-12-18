import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [{
        username: null,
        password: null,
      }],
      isLoggedIn: false,
    }
  }

  render() {
    const login = (this.state.isLoggedIn ? "Logout" : "logon")
    return ( <
      div className = "Main" >
      <
      div className = "toolbar" >
      <div className = "that-title center" onClick={()=> this.props.setRouter('home')}> Market < /div> 
      <ul className = "right hide-on-med-and-down" >
      <li onClick={() => this.props.setRouter('logginguser')}> {login} < /li> <
      /ul> <
      /div> <
      div className = 'button-row' >
      <
      div className = "container" >
      <
      div className = "row" >
      <
      a href = "https://youknowwhattimeitis.com"
      className = "col s2 center-align waves-effect waves-button btn-flat hovereded" > About Us < /a> <
      /div> <
      /div> <
      /div>
      </div>
    );
  }
}

export default Toolbar;
