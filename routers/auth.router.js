const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { ensureNoAuth, ensureAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/auth/login', ensureNoAuth(), authController.loginUser);
router.post('/auth/login', ensureNoAuth(), authController.loginUserOnPost);
router.get('/auth/register/buyer', ensureNoAuth(), authController.registerBuyer);
router.post('/auth/register/buyer', ensureNoAuth(), authController.registerBuyerOnPost);
router.get('/auth/register/seller', ensureNoAuth(), authController.registerSeller);
router.post('/auth/register/seller', ensureNoAuth(), authController.registerSellerOnPost);
router.get('/auth/logout', ensureAuth(), authController.logoutUser);
router.get('/auth/profile', ensureAuth(), authController.viewProfile);
// router.post('/auth/profile', ensureAuth(), authController.editProfile);

exports.authRouter = router;
