const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const {

  getProducts,

  getSingleProduct,

  createProduct,

  updateProduct,

  deleteProduct,

} = require("../controllers/productController");



// ==========================================
// GET ALL PRODUCTS
// ==========================================
router.get("/", getProducts);



// ==========================================
// GET SINGLE PRODUCT
// ==========================================
router.get("/:id", getSingleProduct);



// ==========================================
// CREATE PRODUCT
// ==========================================
router.post(

  "/create",

  protect,

  adminOnly,

  upload.single("image"),

  createProduct

);


// ==========================================
// UPDATE PRODUCT
// ==========================================
router.put(

  "/:id",

  protect,

  adminOnly,

  updateProduct

);



// ==========================================
// DELETE PRODUCT
// ==========================================
router.delete(

  "/:id",

  protect,

  adminOnly,

  deleteProduct

);


// ==========================================
// EXPORT ROUTER
// ==========================================
module.exports = router;