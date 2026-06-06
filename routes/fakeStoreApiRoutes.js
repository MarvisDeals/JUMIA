const fakeStoreController = require('../controllers/fakeStoreControllerApi');
const express = require('express');
const router = express.Router();

// Define routes for fake store API
router.get('/products', fakeStoreController.getProducts);
router.get('/products/:id', fakeStoreController.getProductById);
router.post('/products', fakeStoreController.createProduct);

module.exports = router;