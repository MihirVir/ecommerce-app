const Product = require('../models/Product');
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (err) {
        return res.status(500).json("internal server error");
    }
}
module.exports = {
    createProduct
}