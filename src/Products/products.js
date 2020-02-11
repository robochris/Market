import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios'
import { updateUser } from '../Redux/Actions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: state.session.user
})

const mapDispatchToProps = {
  updateUser
}

const addProduct = async (id, username, cart) => {
  let quantity = 1
  if (cart.find(x => x._id === id)) {
    quantity = cart.find(x => x._id === id).quantity
    quantity++
  }
  return await axios.post('http://localhost:6969/cart/'+username+'/'+id, {quantity, cart}).then(function(res){
    return res.data
  }).catch(function(err){
       console.log(err)
     });
}

class Products extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  handleClick(id) {
    if (this.props.user) {
      addProduct(id,this.props.user.username, this.props.user.cart)
      .then(user => {
        this.props.updateUser(user.user)
      })
    } else {
      this.props.setWarning(true)
    }
  }

  render() {
    const {product} = this.props
    return (
      <div>
        <Card className="productRoot">
        <CardMedia
          className="productImg"
          image={require ("../pictures/"+product.img+".jpg")}
          title={product.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name} - ${product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.des}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={()=> this.handleClick(product._id)}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
