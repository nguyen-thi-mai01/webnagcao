var express = require('express');
var router = express.Router();
const Product = require('../models/product.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const products = await Product.find().limit(5);
        res.render('index', { title: 'Shop Mèo Lười', products: products });
    } catch (error) {
        console.error("Error fetching products:", error); // LOG LỖI CHI TIẾT (ĐÃ SỬA)
        res.render('index', { title: 'Shop Mèo Lười', products: [], error: error.message });
    }
});

/* GET product list page. */
router.get('/products', async function(req, res, next) {
    try {
        const products = await Product.find();
        res.render('product-list', { title: 'Danh sách sản phẩm mèo', products: products });
    } catch (error) {
        res.render('product-list', { title: 'Danh sách sản phẩm mèo', products: [], error: error.message });
    }
});

/* GET product detail page. */
router.get('/products/:id', async function(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Không tìm thấy sản phẩm', error: { status: 404 } });
        }
        res.render('product-detail', { title: 'Chi tiết sản phẩm', product: product });
    } catch (error) {
        res.render('error', { message: error.message, error: { status: 500 } });
    }
});

/* GET shopping cart page. */
router.get('/cart', function(req, res, next) {
    res.render('cart', { title: 'Giỏ hàng', cart: req.session.cart || [] });
});

/* POST add to cart. */
router.post('/cart/add/:productId', async function(req, res, next) {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        let cart = req.session.cart || [];
        const existingItemIndex = cart.findIndex(item => item.productId === productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ productId: productId, quantity: 1, product: product });
        }

        req.session.cart = cart;
        res.redirect('/cart');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;