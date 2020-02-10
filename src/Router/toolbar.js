import React, {Component} from 'react';
import 'Y:/showcasejob/src/App/App.css';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: state.session.user
})

class ToolbarMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const login = (this.props.user ? "Sign-out" : "Sign-in")
    const cart = (this.props.user ?
      <Button color="inherit" startIcon={<ShoppingCartIcon/>} onClick={() => this.props.setRouter('cart')}>
        {this.props.user.cart.length}
      </Button>
      : "");
    console.log(this.props.user)
    return (
      <div className="toolbarRoot">
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="toolbarTitle" onClick={()=> this.props.setRouter('home')}>
            Market
          </Typography>
          {cart}
          <Button color="inherit" onClick={() => this.props.setRouter('logginguser')}>{login}</Button>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

export default connect(mapStateToProps)(ToolbarMarket);
