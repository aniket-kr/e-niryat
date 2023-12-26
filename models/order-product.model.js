const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    buyer: {
        type: Types.ObjectId,
        ref: 'Buyer',
        required: true,
    },

    quantity: {
        type: Types.Number,
        required: true,
        default: 1,
    },

    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
    },

    orderedAt: {
        type: Types.Date,
        required: true,
        default: function () {
            return new Date();
        },
    },

    orderId: {
        type: Types.UUID,
        required: true,
    },

    status: {
        type: Types.String,
        enum: ['PLACED', 'DISPATCHED', 'IN_CUSTOMS', 'COMPLETED', 'CANCELLED'],
        required: true,
        default: 'PLACED',
    },
});

const OrderProductModel = mongoose.model('OrderProduct', orderProductSchema);
module.exports = OrderProductModel;
