const express = require('express');
const faker = require('faker');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb')
const fs = require('fs')
const app = express()
const port = 6969
const stripe = require('stripe')('sk_test_JFz2IBYH7ZoYr64fEjVnmqvf00kbJzJpFv')
let db;
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const client = new MongoClient('mongodb://localhost:27017')

app.post('/login', (req, res) => {
  const users = db.collection('users')
  users.findOne({username: req.body.username, password: req.body.password})
    .then(user=>{
        if(!user) {
          return res.send({error: "LOGIN_ERROR"})
        } else {
          return res.send(user)
        }
        /*db.collection('sessions').insertOne({userId: user._id})
          .then(result =>{
            const session = result.ops[0]
            res.cookie("sessionId", session._id)
            return res.send(user)
          }).catch(function(err){
              console.log(err)
          });*/
    }).catch(err=>{
      return res.send({error: "LOGIN_ERROR"})
    })
})

const register = (username, password, email) => {
  const collection = db.collection('users')
  const user = {username:username, password:password, cart:[], email:email}
  return collection.insertOne(user)
    .then((result) => {
      return result.ops[0]
    })
}

app.post('/register', (req, res) => {
  register(req.body.username, req.body.password, req.body.email)
    .then(user => {
      res.send(user)
    })
})

app.post('/products/add', (req,res) => {
  const products = db.collection('products')
  const product = {name: req.body.name, des: req.body.des, price: req.body.price}
  products.insertOne(product)
    .then((result) => {
      res.send(result.ops[0])
    })
})

app.get('/products', (req, res) => {
  const products = db.collection('products')
  const product = products.find({}).toArray()
    .then((product) => {
      res.send(product)
    })
})

app.get('/cart/:user', (req, res) => {
  const users = db.collection('users')
  const products = db.collection('products')
  const getProduct = entry => {
    return products.findOne({_id: ObjectId(entry._id)})
      .then(result=>({ ...entry, result }))}
  users.findOne({username: req.params.user})
    .then(user =>
      Promise.all(user.cart.map(entry => getProduct(entry)))
        .then(products => res.send(products))
    )
})

app.post('/cart/:user/:productId', (req, res) => {
  const users = db.collection('users')
  const products = db.collection('products')
  const getProduct = entry => {
    return products.findOne({_id: ObjectId(entry._id)})
      .then(result=>({ ...entry, result }))}
  if(req.body.cart.find(x => x._id === req.params.productId)) {
    users.updateOne({username: req.params.user, "cart._id":req.params.productId}, {$set:{"cart.$.quantity": req.body.quantity}})
    .then(()=> {
      users.findOne({username: req.params.user})
        .then(user =>
          Promise.all(user.cart.map(entry => getProduct(entry)))
            .then(cart => res.send({user: user, cart: cart}))
        )
    })
  } else {
   users.findOneAndUpdate({username: req.params.user}, {$push: {cart: {_id: req.params.productId, quantity: 1}}})
    .then(()=> {
      users.findOne({username: req.params.user})
        .then(user=>
          Promise.all(user.cart.map(entry => getProduct(entry)))
            .then(cart => res.send({user: user, cart: cart}))
        )
    })
  }
})

app.delete('/cart/:user/:productId', (req, res) => {
  const users = db.collection('users')
  const products = db.collection('products')
  const getProduct = entry => {
    return products.findOne({_id: ObjectId(entry._id)})
      .then(result=>({...entry, result }))}
  users.findOneAndUpdate({username: req.params.user}, {$pull: {cart: {_id: req.params.productId}}})
   .then(()=> {
     users.findOne({username: req.params.user})
     .then(user=> {
       Promise.all(user.cart.map(entry => getProduct(entry)))
        .then(cart => res.send({user: user, cart: cart}))
     })
   })
})

app.post('/checkout/:user', (req, res)=> {
  const users = db.collection('users')
  users.findOne({username: req.params.user})
    .then(user=>{
      totalPrice = parseInt(req.body.totalPrice)*100
      stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        source: "tok_mastercard",
        receipt_email: user.email,
        metadata: {'order_id': user.username+"-01282020-628"}
      }).then(result => {
          users.findOneAndUpdate({username: req.params.user}, {$set: {cart: []}})
          .then(update=>{
            users.findOne({username: req.params.user})
              .then(user=>{
                res.send({result, user})
              })
          })
        })
    })
})

client.connect()
  .then(() => {
    db = client.db("market")
    app.listen(port, () => console.log(`App listening on port ${port}!`))
  })
//fakerStart();
