const CartProductModel = require('../models/cart-product.model');
const ProductModel = require('../models/product.model');

exports.getBuyerCart = async (buyer) => {
    const cartProducts = await CartProductModel.find({ buyer });
    await Promise.all(cartProducts.map((product) => product.populate('product')));

    return cartProducts;
};
exports.addProduct = async (buyer, productSlug, quantity = 1) => {
    const product = await ProductModel.findOne({ slug: productSlug });
    const cartProduct = await CartProductModel.findOne({ buyer, product });
    if (cartProduct) {
        cartProduct.quantity += quantity;
        await cartProduct.save();
    } else {
        await CartProductModel.create({ buyer, quantity, product });
    }
};

exports.updateQuantity = async (buyer, productSlug, newQuantity) => {
    const product = await ProductModel.findOne({ slug: productSlug });
    const cartProduct = await CartProductModel.findOne({ buyer, product });
    if (cartProduct && newQuantity === 0) {
        await cartProduct.remove();
    }
    if (cartProduct) {
        cartProduct.quantity = newQuantity;
        await cartProduct.save();
    }
};

exports.clearCart = async (buyer) => {
    await CartProductModel.deleteMany({ buyer });
};
