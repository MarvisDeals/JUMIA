const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

const path = require("path");

const sendEmail = require("../utils/emailSender");



// ==========================================
// GET ALL USERS
// ==========================================
const getUsers = async (req, res) => {

  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// GET SINGLE USER
// ==========================================
const getSingleUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// REGISTER USER
// ==========================================
const registerUser = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;


    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }


    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);


    // GENERATE VERIFICATION TOKEN
    const verificationToken = uuidv4();

    console.log("Verification Token:", verificationToken);


    // CREATE USER
    const user = await User.create({

      name,

      email,

      role,

      password: hashedPassword,

      verificationToken,

    });


    // READ HTML TEMPLATE
    let html = fs.readFileSync(

      path.join(__dirname, "../emails/verifyEmail.html"),

      "utf8"

    );


    // CREATE VERIFICATION LINK
    const verificationLink =
      `http://localhost:8080/api/users/verify/${verificationToken}`;


    // REPLACE TEMPLATE VARIABLE
    html = html.replace(
      "{{verificationLink}}",
      verificationLink
    );


    // SEND EMAIL
    await sendEmail(

      email,

      "Verify Your Email",

      html

    );


    res.status(201).json({

      message: "User registered successfully. Verification email sent.",

      user,

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// VERIFY EMAIL
// ==========================================
const verifyEmail = async (req, res) => {

  try {

    const user = await User.findOne({

      verificationToken: req.params.token,

    });


    if (!user) {

      return res.status(400).json({
        message: "Invalid verification token",
      });

    }


    user.isVerified = true;

    user.verificationToken = "";


    await user.save();


    res.status(200).json({
      message: "Email verified successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// LOGIN USER
// ==========================================
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;


    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }


    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(

      password,

      user.password

    );


    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }


    // CHECK EMAIL VERIFICATION
    if (!user.isVerified) {

      return res.status(400).json({
        message: "Please verify your email first",
      });

    }


    // GENERATE JWT TOKEN
    const token = jwt.sign(

      {

        id: user._id,

        role: user.role,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d",

      }

    );


    res.status(200).json({

      message: "Login successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// UPDATE USER
// ==========================================
const updateUser = async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new: true,

      }

    );


    if (!updatedUser) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    res.status(200).json({

      message: "User updated successfully",

      updatedUser,

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// DELETE USER
// ==========================================
const deleteUser = async (req, res) => {

  try {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// EXPORTS
// ==========================================
module.exports = {

  getUsers,

  getSingleUser,

  registerUser,

  verifyEmail,

  loginUser,

  updateUser,

  deleteUser,

};