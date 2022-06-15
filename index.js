let express = require('express');
let app = express();
let cors = require('cors');
let dal = require('./dal.js')

// used to serve statis files from public directory
app.use(express.static('public'))
app.use(cors())

// create user account

app.get('/account/create/:name/:email/:password', function(req,res){

//else create user
dal.create(req.params.name, req.params.email, req.params.password).then((user)=>{
        console.log(user)
        res.send(user)
    })

})

//login user
app.get('/account/login/:email/:password', function(req,res){
    console.log(`********${req.params.email}`)
    dal.find(req.params.email).then((docs)=>{
        console.log(docs);
        res.send(docs)
    })
})

//deposit
// app.get('/account/deposit/:email', function(req,res){
//     res.send({
//         email: req.params.email,
//         password: req.params.password,
//         balance: req.params.balance,
//     })
// })


// //withdraw
app.get('/account/withdraw/:email', function(req,res){
    console.log(req.params.email)
  dal.update(req.params.email).then((docs)=>{
      console.log(docs);
      res.send(docs)
  })
})

// //balance
// app.get('/account/balance/:email', function(req,res){
//     res.send({
//         email: req.params.email,
//         password: req.params.password,
//         balance: req.params.balance,
//     })
// })


//all accounts
app.get('/account/all', function(req,res){
   dal.all().then((docs)=>{
       console.log(docs)
       res.send(docs)
   })
})

let port = 3000;
app.listen(port);
console.log('running on Port: ' + port);