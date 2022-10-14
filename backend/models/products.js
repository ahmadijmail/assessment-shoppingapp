const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: Object,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  userid:{
    type: String,
    required: true,
  }
}, {
    timestamps:true
});

const Product = mongoose.model("products", productSchema);

exports.Product = Product;
