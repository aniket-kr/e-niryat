const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: {
        type: Types.String,
        required: true,
        unique: true,
    },

    password: {
        type: Types.String,
        required: true,
    },

    firstName: {
        type: Types.String,
        required: true,
    },

    lastName: {
        type: Types.String,
        required: true,
    },

    address: {
        type: Types.String,
        required: true,
    },

    pinCode: {
        type: Types.String,
        required: true,
    },

    codeIec: {
        type: Types.String,
        required: true,
    },

    codeAd: {
        type: Types.String,
        required: true,
    },

    gstin: {
        type: Types.String,
        required: true,
        unique: true,
    },

    lutDocument: {
        type: Types.String,
        required: false,
    },
});

sellerSchema.virtual('fullName').get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

const SellerModel = mongoose.model('Seller', sellerSchema);
module.exports = SellerModel;
