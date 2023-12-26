const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: {
        type: Types.String,
        required: true,
    },

    stars: {
        type: Types.Number,
        required: true,
    },

    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
    },

    buyer: {
        type: Types.ObjectId,
        ref: 'Buyer',
        required: true,
    },
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
