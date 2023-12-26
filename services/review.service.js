const ReviewModel = require('../models/review.model');
const productService = require('../services/product.service');

exports.getReviewsByProduct = async (productSlug) => {
    const product = await productService.ensureExists(productSlug);
    const reviews = await ReviewModel.find({ product });
    return reviews;
};

exports.createReview = async ({ content, stars, productSlug, buyer }) => {
    const product = await productService.ensureExists(productSlug);
    const review = await ReviewModel.create({ content, stars, product, buyer });
    return review;
}
