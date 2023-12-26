const { Router } = require('express');
const { ensureAuth, ensureRole } = require('../middlewares/auth.middleware');
const reviewController = require('../controllers/review.controller');

const router = Router();

router.post('/reviews', ensureAuth(), ensureRole('BUYER'), reviewController.createReview);

exports.reviewRouter = router;
