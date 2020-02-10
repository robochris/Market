import React, {Component} from 'react';
import ToolbarMarket from '../Router/toolbar'
import Products from '../Products/products'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';

const productsGet = async () => {
   return await axios.get('http://localhost:6969/products').then(function(res){
     return res.data
   }).catch(function(err){
       console.log(err)
     });
}

class Home extends Component {
constructor(props){
  super(props);
  this.state={
    loading: true,
    products: [],
  }
 }
componentDidMount() {
  productsGet()
  .then(products => {
    this.setState({
      loading: false,
      products,
      addCartWarning: false
    })
  })
}
setWarning = statement => this.setState({addCartWarning:statement})
render() {
  if (this.state.loading) {
    return(
      <div>
        <ToolbarMarket setRouter={this.props.setRouter}/>
        <CircularProgress mx="auto" p={1}/>
      </div>
    )
  }
    return (
      <div>
          <ToolbarMarket setRouter={this.props.setRouter} />
          <Collapse in={this.state.addCartWarning}>
            <Alert severity="info"
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => {this.setState({addCartWarning: false})}}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Please login to add to cart
            </Alert>
          </Collapse>
          <div className="gridRoot">
          <Grid container justify="center" spacing={2}>
            {this.state.products.map(product => (
              <Grid key={product._id} item>
                <Products key={product._id} product={product} setWarning={this.setWarning} setRouter={this.props.setRouter}/>
              </Grid>))}
          </Grid>
          </div>
      </div>
    );
  }
}
export default Home;
