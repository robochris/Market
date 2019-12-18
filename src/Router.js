import React from 'react'
import LoggingUser from './LoggingUser.js';
import Home from './home';

const routes = {
  logginguser: LoggingUser,
  home: Home,
  random: "random."
}

class Router extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      router: "home"
    }
  }

  setRouter = router => this.setState({router})

  render(){
    const Page = routes[this.state.router];
    return(
      <div>
        <Page setRouter = {this.setRouter} />
      </div>
    );
  }
}

export default Router;
