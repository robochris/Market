import React, {Component} from 'react';
import ToolbarMarket from '../Router/toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'
import { loginUser } from '../Redux/Actions'

const mapDispatchToProps = {
  loginUser
}

const mapStateToProps = (state) => ({
  loginError: state.session.error
})

class LoggingUser extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  UserError: false,
  PasswordError: false
  }
}
handleClick() {
  if (this.state.username !== '' && this.state.password !== '') {
    this.setState({UserError:false})
    this.setState({PasswordError:false})
    this.props.loginUser(this.state.username, this.state.password)
    .then(()=>{
      if(this.props.loginError){
        this.setState({UserError:true})
        this.setState({PasswordError:true})
      } else {
        this.props.setRouter('home')
      }
    })
  } else {
    if(this.state.username === '') {
      this.setState({UserError:true})
    }
    if(this.state.password === '') {
      this.setState({PasswordError:true})
    }
  }
}

render() {
    return (
      <div>
        <ToolbarMarket setRouter={this.props.setRouter}/>
        <div className="loginContainer">
          <TextField required error={this.state.UserError === false ? false : true} id="standard-required" label="Username" onChange={(event) => this.setState({username:event.target.value})}/>
          <br/>
          <TextField required error={this.state.PasswordError === false ? false : true} id="standard-password-input" type="password" label="Password" autoComplete="current-password" onChange={(event) => this.setState({password:event.target.value})}/>
          <br/>
          <Button onClick={() => this.handleClick()}>Login</Button>
          <Button onClick={() => this.props.setRouter('register')}>Register</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingUser);
