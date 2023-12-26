const { ZodError } = require('zod');
const { EditSellerSchema } = require('./schemas/auth.schema');
const sellerService = require('../services/seller.service');
const { InvalidLoginException, ExistsException } = require('../exceptions');
const productService = require('../services/product.service');
const orderProductService = require('../services/order-product.service');

exports.editSellerProfile = async (req, res, next) => {
    try {
        const {
            address,
            email,
            firstName,
            lastName,
            pinCode,
            codeAd,
            codeIec,
            gstin,
            lutDocument,
        } = await EditSellerSchema.parseAsync(req.body);

        await sellerService.edit({
            email,
            firstName,
            lastName,
            address,
            pinCode,
            codeAd,
            codeIec,
            gstin,
            lutDocument,
        });

        res.redirect(req.query.next || '/auth/profile');
    } catch (err) {
        if (err instanceof ZodError) {
            res.render('profile', {});
        } else if (err instanceof ExistsException) {
            res.render('profile', {});
        }
        next(err);
    }
};

exports.myAllProducts = async (req, res, next) => {
    try {
        const seller = req.session.seller;
        const products = await productService.findBySeller(seller);
        res.render('myShop', { session: req.session, products });
    } catch (err) {
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        res.render('product-list', { session: req.session });
    } catch (err) {
        next(err);
    }
};

exports.myOrders = async (req, res, next) => {
    try {
        const seller = req.session.seller;
        
        const orderedProducts = await orderProductService.findOrdersBySeller(seller);
        await Promise.all(orderedProducts.map((order) => order.populate(['buyer', 'product'])))

        res.render('sellerOrders', { session: req.session, orderedProducts });
    } catch (err) {
        next(err);
    }
};

exports.nearestDNK = async (req, res, next) => {
    try {
        res.render('dnk-nearest', { session: req.session });
    } catch (err) {
        next(err);
    }
};