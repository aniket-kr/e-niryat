const crypto = require('node:crypto');
const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');
const { default: slugify } = require('slugify');

const tagSchema = new mongoose.Schema({
    label: {
        type: Types.String,
        unique: true,
        required: true,
    },

    slug: {
        type: Types.String,
        required: true,
        unique: true,
        default: function () {
            const hashFn = crypto.createHash('sha256');
            const hex = hashFn.update(`${this.label} ${Date.now()}`).digest('hex').slice(0, 8);
            return slugify(`${this.label} ${hex}`);
        },
    },

    products: {
        type: [{ type: Types.ObjectId, ref: 'Product' }],
        default: [],
    },
});

const TagModel = mongoose.model('Tag', tagSchema);
module.exports = TagModel;
