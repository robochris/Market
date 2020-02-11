import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import hi from '../hi-ohio-logo.jpg'
import Button from '@material-ui/core/Button';
import { updateUser } from '../Redux/Actions'
import {connect} from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

let quantity;
const mapDispatchToProps = {
  updateUser
}

const removeProduct = async (productId, username) => {
  return await axios.delete('http://localhost:6969/cart/'+username+'/'+productId).then(function(res){
    return res.data
  })
  .catch(function(err){
    console.log("Server Error: "+err)
  });
}

const changeQuantity = async (id, username, cart,quantity) => {
  return await axios.post('http://localhost:6969/cart/'+username+'/'+id, {quantity, cart}).then(function(res){
    return res.data
  }).catch(function(err){
       console.log(err)
  });
}

class Cartitem extends Component {
constructor(props){
  super(props);
  this.state={
    quantity: this.props.product.quantity
  }
 }

quantityHandler(id, type) {
  quantity = parseInt(this.props.product.quantity)
  if(type==="Add") {
    quantity++
    this.setUser(id,this.props.user.username, this.props.user.cart, quantity)
  } else if(type==="Remove" && quantity>0) {
    quantity--
    this.setUser(id,this.props.user.username, this.props.user.cart, quantity)
  }
}

setUser(id, username, cart, quantity) {
  changeQuantity(id ,username, cart, quantity).then(user=>{
    this.props.setCart(user.cart)
    this.props.updateUser(user.user)
    this.setState({quantity: this.props.product.quantity})
  })
}

removedProduct(id, username) {
  removeProduct(id, username).then((user=>{
    this.props.setCart(user.cart)
    this.props.updateUser(user.user)
  }))
}

inputChangeQuantity(event, id) {
  quantity = event.target.value
  if(parseInt(quantity)>=0)
  {
    this.setUser(id,this.props.user.username, this.props.user.cart, quantity)
  } else {
    this.setState({quantity: this.props.product.quantity})
  }
}

render() {
    const product = this.props.product.result
    const add = "Add"
    const remove = "Remove"
    return (
      <div className="item">
        <img src={require ("../pictures/"+product.img+".jpg")}/>
        <div className="itemContent">
          <div className="title">
            {product.name}
          </div>
          <div className="price">
            ${product.price}
          </div>
          <div className="quantity">
            <Button id="remove" onClick={() => this.quantityHandler(product._id, remove)}><RemoveIcon/></Button>
            <TextField type="number" inputProps= {{style: {textAlign: "center", fontSize: 28}}} value={this.state.quantity} onChange={(event) => this.inputChangeQuantity(event, product._id)}/>
            <Button id="add" onClick={() => this.quantityHandler(product._id, add)}><AddIcon/></Button>
          </div>
          <div className="delete">
            <Button startIcon={<DeleteForeverIcon/>} onClick={() => this.removedProduct(product._id, this.props.user.username)}></Button>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(undefined, mapDispatchToProps)(Cartitem);
