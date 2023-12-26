const { DoesNotExistException } = require('../exceptions');
const ProductModel = require('../models/product.model');
const TagModel = require('../models/tag.model');

exports.getAllPaginated = async ({ limit, page } = { limit: 12, page: 1 }) => {
    const tags = TagModel.find()
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();

    const totalCount = TagModel.countDocuments();
    return { count: await totalCount, tags: await tags };
};

exports.createTag = async ({ label }) => {
    const tag = await TagModel.create({ label });
    return tag;
};

exports.ensureExists = async (slug) => {
    const tag = await TagModel.findOne({ slug });
    if (!tag) {
        throw new DoesNotExistException(`Tag "${slug}" does not exist`);
    }
    return tag;
};

exports.getProductsByTag = async (tagSlug, { limit, page } = { limit: 12, page: 1 }) => {
    const tag = await this.ensureExists(tagSlug);
    const count = await ProductModel.countDocuments({ tags: { $in: tag._id } }).exec();
    await tag.populate('products');
    return { count, products: tag.products, tag };
};

exports.findById = async (id) => {
    const tag = await TagModel.findById(id);
    if (!tag) {
        throw DoesNotExistException(`Tag ID("${id}") does not exist`);
    }
    return tag;
};

exports.addProduct = async (tagSlug, product) => {};
