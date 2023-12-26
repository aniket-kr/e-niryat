const SellerModel = require('../models/seller.model');
const authService = require('./auth.service');
const { InvalidLoginException, ExistsException } = require('../exceptions');

exports.findByEmail = async (email) => {
    const seller = await SellerModel.findOne({ email });
    if (!seller) {
        throw new InvalidLoginException('Invalid username or password');
    }
    return seller;
};

exports.ensureNotExists = async (email) => {
    const seller = await SellerModel.exists({ email });
    if (seller) {
        throw ExistsException(`Seller "${email}" already exists`);
    }
};

exports.create = async ({
    email,
    password,
    firstName,
    lastName,
    address,
    pinCode,
    codeIec,
    codeAd,
    gstin,
    lutDocument,
}) => {
    const passwordHash = await authService.hashPassword(password);
    const seller = await SellerModel.create({
        email,
        password: passwordHash,
        firstName,
        lastName,
        address,
        pinCode,
        codeIec,
        codeAd,
        gstin,
        lutDocument: lutDocument || undefined,
    });
    return seller;
};

exports.validate = async (email, password) => {
    const seller = await this.findByEmail(email);
    const isValid = await authService.verifyPassword(password, seller.password);
    if (!isValid) {
        throw new InvalidLoginException('Invalid username or password');
    }
    return seller;
};

exports.edit = async ({
    email,
    firstName,
    lastName,
    address,
    pinCode,
    codeAd,
    codeIec,
    gstin,
    lutDocument,
}) => {
    const seller = await this.findByEmail(email);
    await seller.updateOne({
        firstName,
        lastName,
        address,
        pinCode,
        codeAd,
        codeIec,
        gstin,
        lutDocument,
    });
    return seller;
};
