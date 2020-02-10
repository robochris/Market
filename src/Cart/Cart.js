import React, {Component} from 'react';
import ToolbarMarket from '../Router/toolbar'
import Cartitem from './cartItem'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { updateUser } from '../Redux/Actions'
import axios from 'axios'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: state.session.user
})

const mapDispatchToProps = {
  updateUser
}

const cartGet = async (username) => {
   return await axios.get('http://localhost:6969/cart/'+username).then(function(res){
     return res.data
   }).catch(function(err){
       console.log(err)
     });
}

const checkout = async (username, totalPrice) => {
  return await axios.post('http://localhost:6969/checkout/'+username, {totalPrice}).then(function(res){
    return res.data
  }).catch(function(err){
    console.log("clientError:"+err)
  })
}
class Cart extends Component {
constructor(props){
  super(props);
  this.state={
    loading: true,
    cart: [],
    totalPrice: 0,
    open: false,
    result: ""
  }
 }
 componentDidMount() {
   cartGet(this.props.user.username)
   .then(cart => {
     this.setState({
       loading: false,
       cart,
     })
   })
 }

handleClick() {
  let sum = 0
  for(const product of this.state.cart) sum+=product.quantity*product.result.price
  checkout(this.props.user.username, sum)
  .then((result)=>{
    this.setState({open:true, result})
  })
}

exitCart() {
  this.props.updateUser(this.state.result.user)
  this.setState({open:false})
  this.props.setRouter('home')
}

setCart = cart => this.setState({cart})
renderTotalprice () {
  let sum = 0
  for(const product of this.state.cart) sum+=product.quantity*product.result.price
  return <span>{sum}</span>
}

render() {
    if (this.state.loading) {
      return(
        <div>
          <ToolbarMarket setRouter={this.props.setRouter}/>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div>
          <ToolbarMarket setRouter={this.props.setRouter}/>
          <Grid container justify="center" className="cartGridRoot" spacing={2}>
            <Grid item xs={9}>
              <div className="cartContainer">
                <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
                  {this.state.cart.map(product => (
                    <Grid key={product._id} item>
                      <Cartitem key={product._id} product={product} user={this.props.user} setCart={this.setCart} setRouter={this.props.setRouter}/>
                    </Grid>))}
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3}>
              <Card className="checkoutCard">
                  <CardContent>
                  <Grid container justify="center" alignItems="center" spacing={1}>
                    <Typography variant="h5" component="h2">
                    <Grid item xs={6}>
                    <div className="text">
                    Subtotal
                    </div>
                    </Grid>
                    <Grid item xs={6}>
                      ${this.renderTotalprice()}
                    </Grid>
                    </Typography>
                    </Grid>
                  </CardContent>
                  <CardActionArea onClick={() => this.handleClick()}>
                  <CardActions className="checkoutAction">
                    <Typography variant="h5" >Proceed to checkout</Typography>
                  </CardActions>
                  </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open}>
            <div className="checkoutModal">
              <h2>Thank you</h2>
              <p>
                Your total was $<span>{this.renderTotalprice()}</span>
              </p>
              <Button onClick={()=>this.exitCart()}>Close</Button>
            </div>
          </Modal>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
