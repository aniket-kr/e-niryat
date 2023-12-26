const { Router } = require('express');
const { ensureAuth, ensureRole } = require('../middlewares/auth.middleware');
const cartProductController = require('../controllers/cart-product.controller');

const router = Router();

router.get('/cart', ensureAuth(), ensureRole('BUYER'), cartProductController.getCart);
router.get('/cart/add', ensureAuth(), ensureRole('BUYER'), cartProductController.addToCart);
router.get('/cart/update', ensureAuth(), ensureRole('BUYER'), cartProductController.updateCart);
router.get('/cart/checkout', ensureAuth(), ensureRole('BUYER'), cartProductController.checkoutCart);

exports.cartProductRouter = router;
