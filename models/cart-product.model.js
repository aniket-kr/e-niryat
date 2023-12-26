const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');

const cartProductSchema = new mongoose.Schema({
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
});

const CartProductModel = mongoose.model('CartProduct', cartProductSchema);
module.exports = CartProductModel;
