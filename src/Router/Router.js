import React, { Component } from 'react'
import LoginLogout from '../LoginRegister/LoginLogout';
import Home from '../Home/home';
import Cart from '../Cart/Cart'
import Register from '../LoginRegister/Register'

const routes = {
  logginguser: LoginLogout,
  home: Home,
  register: Register,
  cart: Cart,
}

class Router extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      router: "home",
    }
  }

  setRouter = router => this.setState({router})
  render(){
    const Page = routes[this.state.router];
    return(
      <div>
        <Page setRouter = {this.setRouter}/>
      </div>
    );
  }
}

export default Router;
