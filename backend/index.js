const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config()
const products=require('./products')
const mongoose = require('mongoose')
const URI=process.env.DBURL

const registerRoute=require('./routes/register')

const loginRoute=require('./routes/login')

app.use(express.json());
app.use(cors());

app.use('/api/register', (registerRoute))
app.use('/api/login', (loginRoute))

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get('/products', (req,res)=>{
    res.send(products)
})

app.listen(port, console.log(`we are runng on port ${port}`));
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongo working");
})