const axios = require('axios');
const baseURL = 'https://fakestoreapi.com';

const api = axios.create({
    baseURL,
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example of a GET request to fetch products
exports.getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};


//Get a single product by ID
exports.getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};


//Create a new product
exports.createProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};



 