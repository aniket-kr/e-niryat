const BuyerModel = require('../models/buyer.model');
const authService = require('./auth.service');
const { InvalidLoginException, ExistsException } = require('../exceptions');

exports.findByEmail = async (email) => {
    const buyer = await BuyerModel.findOne({ email });
    if (!buyer) {
        throw new InvalidLoginException('Invalid username or password');
    }
    return buyer;
};

exports.ensureNotExists = async (email) => {
    const buyer = await BuyerModel.exists({ email });
    if (buyer) {
        throw new ExistsException(`Buyer "${email}" already exists`);
    }
};

exports.create = async ({ email, password, firstName, lastName, address, pinCode }) => {
    const passwordHash = await authService.hashPassword(password);
    const buyer = await BuyerModel.create({
        email,
        password: passwordHash,
        firstName,
        lastName,
        address,
        pinCode,
    });
    return buyer;
};

exports.validate = async (email, password) => {
    const buyer = await this.findByEmail(email);
    const isValid = await authService.verifyPassword(password, buyer.password);
    if (!isValid) {
        throw new InvalidLoginException('Invalid username or password');
    }
    return buyer;
};

exports.edit = async ({ email, firstName, lastName, address, pinCode }) => {
    const buyer = await this.findByEmail(email);
    await buyer.updateOne({ firstName, lastName, address, pinCode });
    return buyer;
};
