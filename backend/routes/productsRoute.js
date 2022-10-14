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

router.put("/:id", async (req, res) => {
  const { name, description, image, price } = req.body;
  console.log(req.body);
  try {
    if (image) {
      const uploadres = await cloudinary.uploader.upload(image, {
        upload_preset: "liwdvkxq",
      });
      console.log(uploadres, "imgglinkk");

      if (uploadres) {
        let itemId = req.params.id;
        Product.findByIdAndUpdate(
          { _id: itemId },
          {
            name: name,
            description: description,
            image: uploadres,
            price: price,
          },
          { new: true },
          (error, data) => {
            if (error) {
              res.send(error);
            } else {
              console.log(data);
              res.send("updated");
            }
          }
        );
        //res.status(200).send(response);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  
});

router.delete("/:id", async (req, res) => {
  const { name, description, image, price } = req.body;
  console.log(req.body);
 
        let itemId = req.params.id;
        Product.deleteOne(
          { _id: itemId },
     
        (error, data) => {
          if (error) {
            res.send(error);
          } else {
            console.log(data);
            res.send("updated");
          }
        }
        )

    
 
    

  
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
