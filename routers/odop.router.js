const { Router } = require('express');
const odopController = require('../controllers/odop.controller');


const router = Router();


router.get('/single-blog/:blogSlug',odopController.getBlogBySlug);

exports.odopRouter = router;