const { Router } = require('express');
const tagController = require('../controllers/tag.controller');
const { ensureAuth, ensureRole } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/tags', tagController.getAllPaginated);

router.get('/tags/create/new', ensureAuth(), ensureRole('SELLER'), tagController.createTag);
router.post('/tags/create/new', tagController.createTagOnPost);

router.get('/tags/:tagSlug/products', tagController.getProductsByTag);

exports.tagRouter = router;
