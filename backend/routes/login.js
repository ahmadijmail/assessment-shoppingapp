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
  if (err) return res.status(400).send("Something went wrong!");
  let userCheck = await User.findOne({ email: req.body.email });
  if (!userCheck) return res.status(400).send("unregistered Email");
  const isValid = await bcrypt.compare(req.body.password, userCheck.password);

  if (!isValid) return res.status(400).send("Wrong email or password!");

  const generateAuthToken = (userCheck) => {
    const jwtSecretKey = "process.env.JWT_SECRET_KEY";
    const token = jwt.sign(
      { _id: userCheck._id, name: userCheck.name, email: userCheck.email },
      jwtSecretKey
    );

    return token;
  };
  const token = generateAuthToken(userCheck);

  res.send(token);
});

module.exports = router;
