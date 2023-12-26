const ProductModel = require('../models/product.model');
const seller = require('../models/seller.model');
const { DoesNotExistException } = require('../exceptions');

exports.createProduct = async ({
    name,
    imageUrls,
    priceInInr,
    description,
    weight,
    width,
    height,
    quantity,
    hsCode,
    seller,
}) => {
    const product = await ProductModel.create({
        name,
        images: imageUrls,
        priceInInr,
        description,
        specs: {
            weight,
            width,
            height,
            quantity,
        },
        hsCode,
        seller,
    });

    return product;
};

exports.ensureExists = async (slug) => {
    const product = await ProductModel.findOne({ slug });
    if (!product) {
        throw new DoesNotExistException(`Product "${slug}" does not exist`);
    }
    return product;
};

exports.getProductsPaginated = async ({ page, limit } = { page: 1, limit: 12 }) => {
    const totalProducts = ProductModel.countDocuments();
    const products = ProductModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    return { total: await totalProducts, products: await products };
};

exports.latestProducts = async() => {
        const limitNumber = 8;
        const products = await ProductModel.find({}).sort({ _id: -1 }).limit(limitNumber);
        return {products: await products};
};

exports.mostBoughtProduct = async() => {
       let count = await ProductModel.find().countDocuments();
       let random = Math.floor(Math.random()*count); 
       let productas = await ProductModel.findOne().skip(random).exec();
       return {productas: await productas};
}

exports.findBySeller = async (seller) => {
    const products = await ProductModel.find({ seller });
    await Promise.all(products.map(async (product) => await product.populate('tags')));
    return products;
};
