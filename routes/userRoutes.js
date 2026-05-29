const express = require("express");

const router = express.Router();

const {

  getUsers,

  getSingleUser,

  registerUser,

  verifyEmail,

  loginUser,

  updateUser,

  deleteUser,

} = require("../controllers/userController");



// ==========================================
// GET ALL USERS
// ==========================================
router.get("/", getUsers);



// ==========================================
// GET SINGLE USER
// ==========================================
router.get("/:id", getSingleUser);



// ==========================================
// REGISTER USER
// ==========================================
router.post("/register", registerUser);



// ==========================================
// VERIFY EMAIL
// ==========================================
router.get("/verify/:token", verifyEmail);



// ==========================================
// LOGIN USER
// ==========================================
router.post("/login", loginUser);



// ==========================================
// UPDATE USER
// ==========================================
router.put("/:id", updateUser);



// ==========================================
// DELETE USER
// ==========================================
router.delete("/:id", deleteUser);



// ==========================================
// EXPORT ROUTER
// ==========================================
module.exports = router;





