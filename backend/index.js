const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const URI=process.env.DBURL

const registerRoute=require('./routes/register')
const productsRoute= require('./routes/productsRoute')
const loginRoute=require('./routes/login')


app.use(cors());
app.use(express.json({limit: '50mb'}));


app.use('/api/register', (registerRoute))
app.use('/api/login', (loginRoute))
app.use('/api/products', (productsRoute))
app.get("/", (req, res) => {
  res.send("welcome");
});



app.listen(port, console.log(`we are runng on port ${port}`));
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongo working");
})