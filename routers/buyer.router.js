const { Router } = require('express');
const buyerController = require('../controllers/buyer.controller');
const { ensureNoAuth, ensureAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/buyer/editProfile', ensureAuth(), buyerController.editBuyerProfile);

exports.buyerRouter = router;
