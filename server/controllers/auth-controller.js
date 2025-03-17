const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const { response } = require("express");

const home = async (req, res) => {
  try {
    res.status(200).send("Hello World knox!");
  } catch (error) {
    console.error("Error in home route:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create user
    const userCreated = await User.create({
      name,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: "User registered successfully",
      token : await userCreated.generateAuthToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    // console.error("Error in register route:", error);
    // res.status(500).json({ msg: "Internal Server Error", error: error.message });
    next(error);
  }
};


// User Login Logic
const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    console.log(userExists);

    if (!userExists) {
      return res.ststus(400).json({ msg: "Invalid Credentials"});
    }

    // const user = await bcrypt.compare(password, userExists.password);
    const user =await userExists.comparePassword(password);

    if (user) {
      res.status(200).json({ 
      msg: "Login Successful",
      token : await userExists.generateAuthToken(),
      userId: userExists._id.toString(),
    });
  } else {
    return res.status(400).json({ msg: "Invalid email or password" });
  }
    
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error});
  }
}


module.exports = { home, register, login};
