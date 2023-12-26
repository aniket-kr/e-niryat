const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name: {
        type: Types.String,
        required: true,
    },

    slug: {
        type: Types.String,
        required: true,
        unique: true,
        default: function () {
            return slugify(`${this.name} ${Date.now()}`);
        },
    },

    images: {
        type: [Types.String],
        required: true,
        default: [],
    },

    priceInInr: {
        type: Types.Number,
        required: true,
    },

    description: {
        type: Types.String,
        required: true,
    },

    specs: {
        weight: {
            type: Types.Number,
            required: true,
        },

        width: {
            type: Types.Number,
            required: true,
        },

        height: {
            type: Types.Number,
            required: true,
        },

        quantity: {
            type: Types.Number,
            required: true,
        },
    },

    hsCode: {
        type: Types.String,
        required: false,
    },

    tags: {
        type: [{ type: Types.ObjectId, ref: 'Tag' }],
        required: true,
        default: [],
    },

    seller: {
        type: Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
});

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;
