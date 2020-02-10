import React, {Component} from 'react';
import LoggingUser from '../LoginRegister/LoggingUser.js';
import Logout from '../LoginRegister/Logout'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  user: state.session.user
})

class LoginLogout extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  render() {
    if(this.props.user) { return <Logout setRouter={this.props.setRouter}/>}
    return <LoggingUser setRouter={this.props.setRouter}/>
  }
}

export default connect(mapStateToProps)(LoginLogout);
