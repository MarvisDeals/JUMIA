const fakeStoreAdapter = require('../configs/fakeStoreAdapter');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const data = await fakeStoreAdapter.getProducts();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fakeStoreAdapter.getProductById(id);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const data = await fakeStoreAdapter.createProduct(productData);
        return res.status(201).json(data);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Failed to create product' });
    }
};