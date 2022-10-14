const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { err } = schema.validate(req.body);
  if (err) return res.status(400).send("error while creating");
  let userCheck = await User.findOne({ email: req.body.email });

  if (userCheck) return res.status(400).send("Email already exist");

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  let ranvalue = await bcrypt.genSalt(10);

  newUser.password = await bcrypt.hash(newUser.password, ranvalue);

  const generateAuthToken = (newUser) => {
    const jwtSecretKey = "process.env.JWT_SECRET_KEY";
    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name, email: newUser.email },
      jwtSecretKey
    );

    return token;
  };

  await newUser.save();

  const token = generateAuthToken(newUser);

  res.send(token);
});

module.exports = router;
