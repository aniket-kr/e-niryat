const express = require('express');
const envelopeController = require('../controllers/envelopeController');

const router = express.Router();

router.get('/category', envelopeController.shopCategory);
router.get('/single-product', envelopeController.singleProduct);
router.get('/checkout', envelopeController.checkout);
router.get('/cart', envelopeController.cart);
router.get('/confirmation', envelopeController.confirmation);
router.get('/blog', envelopeController.blog);
router.get('/single-blog', envelopeController.singleBlog);
router.get('/tracking', envelopeController.tracking);
router.get('/contact', envelopeController.contact);
router.get('/elements', envelopeController.elements);
router.get('/list', envelopeController.productList);
router.get('/seller-dashboard', envelopeController.sellerDashboard);
router.get('/checkPackage', envelopeController.checkPackage);

module.exports = router;
