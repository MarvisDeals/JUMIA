const Product = require("../models/productModel");

const cloudinary = require("../configs/cloudinary");

const fs = require("fs");

const sendEmail = require("../utils/emailSender");



// ==========================================
// GET ALL PRODUCTS
// ==========================================
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// GET SINGLE PRODUCT
// ==========================================
const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// CREATE PRODUCT
// ==========================================
const createProduct = async (req, res) => {

  try {

    const {

      name,

      description,

      price,

      category,

      brand,

      stock,

    } = req.body;


    let imageUrl = "";


    // UPLOAD IMAGE TO CLOUDINARY
    if (req.file) {

      const result = await cloudinary.uploader.upload(

        req.file.path

      );

      imageUrl = result.secure_url;


      // DELETE LOCAL FILE
      fs.unlinkSync(req.file.path);

    }


    const product = await Product.create({

      name,

      description,

      price,

      category,

      brand,

      stock,

      image: imageUrl,

    });


    res.status(201).json({

      message: "Product created successfully",

      product,

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// UPDATE PRODUCT
// ==========================================
const updateProduct = async (req, res) => {

  try {

    const updatedProduct = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new: true,

      }

    );


    if (!updatedProduct) {

      return res.status(404).json({
        message: "Product not found",
      });

    }


    // SEND EMAIL WHEN PRODUCT UPDATED
    await sendEmail(

      process.env.EMAIL_USER,

      "Product Updated",

      `<h2>Product Updated Successfully</h2>
       <p>${updatedProduct.name} has been updated.</p>`

    );


    res.status(200).json({

      message: "Product updated successfully",

      updatedProduct,

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// ==========================================
// DELETE PRODUCT
// ==========================================
const deleteProduct = async (req, res) => {

  try {

    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );


    if (!deletedProduct) {

      return res.status(404).json({
        message: "Product not found",
      });

    }


    res.status(200).json({
      message: "Product deleted successfully",
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

  getProducts,

  getSingleProduct,

  createProduct,

  updateProduct,

  deleteProduct,

};