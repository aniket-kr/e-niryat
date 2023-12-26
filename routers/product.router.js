const { Router } = require('express');
const productController = require('../controllers/product.controller');
const { ensureAuth, ensureRole } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/products', productController.getAllPaginated);
router.get('/productsFiltered', productController.getAllFiltered);
router.get(
    '/products/create',
    ensureAuth(),
    ensureRole('SELLER'),
    productController.getListProductPage
);
router.post('/products', ensureAuth(), ensureRole('SELLER'), productController.createProduct);

router.get('/products/:productSlug', productController.getProductBySlug);
router.put(
    '/products/:productSlug',
    ensureAuth(),
    ensureRole('SELLER'),
    productController.updateProductBySlug
);

exports.productRouter = router;
