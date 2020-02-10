import React, {Component} from 'react';
import ToolbarMarket from '../Router/toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  user: state.session.user
})

class Logout extends Component {
constructor(props){
  super(props);
  this.state={
  }
}
handleClick() {
  window.location.reload(false)
}

render() {
    return (
      <div>
        <ToolbarMarket setRouter={this.props.setRouter}/>
        <div className="loginContainer">
          Are you sure you want to sign-out?
          <Button onClick={() => this.handleClick()}>YES</Button>
          <Button onClick={() => this.props.setRouter('home')}>NO</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Logout);
