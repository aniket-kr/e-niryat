const { Router } = require('express');
const { ensureAuth } = require('../middlewares/auth.middleware');
const defaultController = require('../controllers/default.controller');
const trackingController = require('../controllers/tracking.controller');

const router = Router();

router.get('/', defaultController.home);
router.get('/map', (req, res, next) => res.render('sample', {session: req.session }));
router.get('/tracking', ensureAuth(), trackingController.track);

router.get('/generate-pdf', ensureAuth(), defaultController.downloadPdf);

exports.defaultRouter = router;
