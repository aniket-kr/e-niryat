const orderProductService = require('../services/order-product.service');

// /tracking
// /tracking?orderId=<orderId>
exports.track = async (req, res, next) => {
    try {
        const { orderId } = req.query;
        const orders = orderId ? await orderProductService.findOrderById(orderId) : [];
        await Promise.all(orders.map(async (order) => order.populate('product')));

        const opts = {
            session: req.session,
            orderedProducts: orders,
            orderId: orderId || null,
        }
        res.render('tracking', opts);
    } catch (err) {
        next(err);
    }
};
