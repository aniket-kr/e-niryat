const { DoesNotExistException } = require('../exceptions');
const productService = require('../services/product.service');
const tagService = require('../services/tag.service');
const reviewService = require('../services/review.service');
const { createProductSchema } = require('./schemas/product.schema');
const TagModel = require('../models/tag.model');

exports.getAllPaginated = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const { total, products } = await productService.getProductsPaginated({ page, limit });
        const { totalTags, tags } = await tagService.getAllPaginated({ limit, page });

        res.render('category', { products, total, tags, session: req.session, page, limit });
    } catch (err) {
        next(err);
    }
};

exports.getAllFiltered = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const { total, products } = await productService.getProductsPaginated({ page, limit });
        const { totalTags, tags } = await tagService.getAllPaginated({ limit, page });

        let min = req.query.minPrice;
        let max = req.query.maxPrice;

        res.render('category-price', {
            products,
            total,
            tags,
            min,
            max,
            session: req.session,
            page,
            limit,
        });
    } catch (err) {
        next(err);
    }
};

exports.getProductBySlug = async (req, res, next) => {
    try {
        const { productSlug: slug } = req.params;
        const product = await productService.ensureExists(slug);

        // fetch tag here for getting the label const label
        const tags = await Promise.all(
            product.tags.map(async (tagId) => tagService.findById(tagId))
        );

        const reviews = await reviewService.getReviewsByProduct(product.slug);

        res.render('single-product', { product, tags, session: req.session, reviews });
    } catch (err) {
        if (err instanceof DoesNotExistException) {
            next('route'); // handle 404
        }
        next(err);
    }
};

exports.updateProductBySlug = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { seller } = req.session;
        const { tags, ...prod } = await createProductSchema.parseAsync(req.body);

        const product = await productService.createProduct({ ...prod, seller });
        product.tags.push(...tags);
        await product.save();

        tags.forEach((tagSlug) => tagService.addProduct(tag, product));
    } catch (err) {
        next(err);
    }
};

exports.getListProductPage = async (req, res, next) => {
    try {
        const tags = await TagModel.find();
        res.render('product-list', { session: req.session, tags });
    } catch (err) {
        next(err);
    }
};


