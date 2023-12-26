const { createReviewSchema } = require('./schemas/review.schema');
const reviewService = require('../services/review.service');
const productService = require('../services/product.service');


exports.createReview = async (req, res, next) => {
    try {
        const { buyer } = req.session;
        const { content, stars, productSlug } = await createReviewSchema.parseAsync(req.body);
        const product = await productService.ensureExists(productSlug);
        const review = await reviewService.createReview({ content, stars, productSlug, buyer });
        const reviews = await reviewService.getReviewsByProduct(productSlug);

        res.render('single-product', { session: req.session, product, reviews  });
    } catch (err) {
        next(err);
    }
}
