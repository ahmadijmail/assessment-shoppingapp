const express = require("express");
const { Product } = require("../models/products");
const router = express.Router();
const cloudinary = require("../assests/cloudinary");

router.post("/", async (req, res) => {
  const { name, description, image, price, userid } = req.body;

  try {
    if (image) {
      const uploadres = await cloudinary.uploader.upload(image, {
        upload_preset: "liwdvkxq",
      });
           console.log(uploadres, "imgglinkk");
      
      if (uploadres) {
        const newproduct = new Product({
          name,
          description,
          image: uploadres,
          price,
          userid,
        });
         console.log(newproduct);
        const response = await newproduct.save();
        res.status(200).send(response);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
