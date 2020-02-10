import React, {Component} from 'react';
import ToolbarMarket from 'Y:/showcasejob/src/Router/toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { registerUser } from '../Redux/Actions'

const mapDispatchToProps = {
  registerUser
}

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      email:'',
    }
  }
  handleClick() {
    this.props.registerUser(this.state.username, this.state.password, this.state.email)
    this.props.setRouter('home')
  }

  render() {
    return (
      <div>
        <ToolbarMarket setRouter={this.props.setRouter}/>
        <div className="loginContainer">
          <TextField required label="Email"required onChange={(event) => this.setState({email:event.target.value})}/>
          <br/>
          <TextField required label="Username" onChange={(event) => this.setState({username:event.target.value})}/>
          <br/>
          <TextField required label="Password" type="password" onChange = {(event) => this.setState({password:event.target.value})}/>
          <br/>
          <Button onClick={() => this.handleClick()}>Register</Button>
          <Button onClick={() => this.props.setRouter('login')}>Login</Button>
        </div>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(Register);
