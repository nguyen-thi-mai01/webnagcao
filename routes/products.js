var express = require('express');
var router = express.Router();
const Product = require('../models/product.model');

// Get all products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new product
router.post('/', async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        breed: req.body.breed,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update product
router.patch('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        if (req.body.name != null) {
            product.name = req.body.name;
        }
        if (req.body.breed != null) {
            product.breed = req.body.breed;
        }
        if (req.body.price != null) {
            product.price = req.body.price;
        }
        if (req.body.description != null) {
            product.description = req.body.description;
        }
        if (req.body.image != null) {
            product.image = req.body.image;
        }
        if (req.body.category != null) {
            product.category = req.body.category;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json({ message: 'Đã xóa sản phẩm thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;