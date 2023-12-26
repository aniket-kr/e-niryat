const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');

const buyerSchema = new mongoose.Schema({
    email: {
        type: Types.String,
        unique: true,
        required: true,
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
});

buyerSchema.virtual('fullName').get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

const BuyerModel = mongoose.model('Buyer', buyerSchema);
module.exports = BuyerModel;
