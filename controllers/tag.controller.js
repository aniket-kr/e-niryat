const tagService = require('../services/tag.service');
const { createTagSchema } = require('./schemas/tag.schema');

exports.getAllPaginated = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 12;
        const page = parseInt(req.query.page, 10) || 1;

        const { total, tags } = await tagService.getAllPaginated({ limit, page });
        res.render('tags', { session: req.session, total, tags });
    } catch (err) {
        next(err);
    }
};

exports.createTag = async (req, res, next) => {
    try {
        res.render('create-tag');
    } catch (err) {
        next(err);
    }
};

exports.createTagOnPost = async (req, res, next) => {
    try {
        const { label } = await createTagSchema.parseAsync(req.body);
        const tag = await tagService.createTag({ label });
        res.redirect('/tags');
    } catch (err) {
        next(err);
    }
};

exports.getProductsByTag = async (req, res, next) => {
    try {
        const { tagSlug: slug } = req.params;
        const limit = parseInt(req.query.limit, 10) || 12;
        const page = parseInt(req.query.page, 10) || 1;
        const { count, products, tag } = await tagService.getProductsByTag(slug, { limit, page });
        const { totalTags, tags } = await tagService.getAllPaginated({ limit, page });

        res.render('category-tag', {
            session: req.session,
            count,
            products: products.slice((page - 1) * limit, (page - 1) * limit + limit),
            tag,
            tags,
            limit,
            page,
            total: count,
        });
    } catch (err) {
        next(err);
    }
};
