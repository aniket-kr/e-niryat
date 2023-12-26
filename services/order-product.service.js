const crypto = require('node:crypto');
const OrderProductModel = require('../models/order-product.model');

exports.createOrderFromCart = async (cartProducts, buyer) => {
    const orderedAt = new Date();
    const orderId = crypto.randomUUID();
    const orderProducts = [];
    for (let cartProduct of cartProducts) {
        const orderProduct = await OrderProductModel.create({
            buyer,
            orderedAt,
            product: cartProduct.product,
            quanity: cartProduct.quanity,
            orderId,
        });
        orderProducts.push(orderProduct);
    }
    return orderProducts;
};

exports.findOrderById = async (orderId) => {
    const orderedProducts = await OrderProductModel.find({ orderId });
    return orderedProducts;
};

exports.findOrdersBySeller = async (seller) => {
    const orders = await OrderProductModel.find({ seller: seller }).sort({ orderedAt: 1 });
    return orders;
};

exports.findProductFromOrder = async (orderId, productId) => {
    const orderProduct = await OrderProductModel.findOne({ orderId, product: productId });
    await orderProduct.populate(['product', 'buyer']);
    await orderProduct.product.populate('seller');
    return orderProduct;
}


exports.findProductFromOrder = async (orderId, productId) => {
    const orderProduct = await OrderProductModel.findOne({ orderId, product: productId });
    await orderProduct.populate(['product', 'buyer']);
    await orderProduct.product.populate('seller');
    return orderProduct;
}
exports.findOrdersBySeller = async (seller) => {
    const orders = await OrderProductModel.find({ seller: seller }).sort({ orderedAt: 1 });
    return orders;
};