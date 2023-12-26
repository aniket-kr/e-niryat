const { ZodError } = require('zod');
const {
    loginUserSchema,
    registerBuyerSchema,
    registerSellerSchema,
} = require('./schemas/auth.schema');
const buyerService = require('../services/buyer.service');
const sellerService = require('../services/seller.service');
const { InvalidLoginException, ExistsException } = require('../exceptions');

exports.loginUser = async (req, res, next) => {
    try {
        res.render('login', { session: req.session });
    } catch (err) {
        next(err);
    }
};

exports.loginUserOnPost = async (req, res, next) => {
    try {
        const { email, password, role } = await loginUserSchema.parseAsync(req.body);
        if (role === 'BUYER') {
            const buyer = await buyerService.validate(email, password);

            // set session properties
            req.session.isAuthenticated = true;
            req.session.role = role;
            req.session.buyer = buyer;
        } else {
            const seller = await sellerService.validate(email, password);

            // set session properties
            req.session.isAuthenticated = true;
            req.session.role = role;
            req.session.seller = seller;
        }

        // redirect user to `next` or home
        res.redirect(req.query.next || '/');
    } catch (err) {
        if (err instanceof ZodError) {
            res.render('login', {
                title: 'eNiryat: Login',
                session: req.session,
                errors: err.format(),
            });
        } else if (err instanceof InvalidLoginException) {
            res.render('login', {
                title: 'eNiryat: Login',
                session: req.session,
                generalError: err.message,
            });
        }
        next(err);
    }
};

exports.registerBuyer = async (req, res, next) => {
    try {
        res.render('registrationBuyer', {
            title: 'eNiryat: Register New Buyer',
            session: req.session,
        });
    } catch (err) {
        next(err);
    }
};

exports.registerBuyerOnPost = async (req, res, next) => {
    try {
        const { address, email, firstName, lastName, password, pinCode } =
            await registerBuyerSchema.parseAsync(req.body);

        await buyerService.ensureNotExists(email);
        const buyer = await buyerService.create({
            email,
            password,
            firstName,
            lastName,
            address,
            pinCode,
        });
        res.redirect(req.query.next || '/auth/login');
        // res.redirect('/auth/login');
    } catch (err) {
        if (err instanceof ZodError) {
            res.render('registrationBuyer', {});
        } else if (err instanceof ExistsException) {
            res.render('registrationBuyer', {});
        }
        next(err);
    }
};

exports.registerSeller = async (req, res, next) => {
    try {
        res.render('registrationSeller', {
            title: 'eNiryat: Register New Seller',
            session: req.session,
        });
    } catch (err) {
        next(err);
    }
};

exports.registerSellerOnPost = async (req, res, next) => {
    try {
        const { address, email, firstName, lastName, password, pinCode, codeIec, codeAd, gstin } =
            await registerSellerSchema.parseAsync(req.body);

        await sellerService.ensureNotExists(email);
        await sellerService.create({
            email,
            password,
            firstName,
            lastName,
            address,
            pinCode,
            codeIec,
            codeAd,
            gstin,
        });

        res.redirect(req.query.next || '/auth/login');
    } catch (err) {
        if (err instanceof ZodError) {
            res.render('registrationSeller', {});
        } else if (err instanceof ExistsException) {
            res.render('registrationSeller', {});
        }
        next(err);
    }
};

exports.logoutUser = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            err && console.log({ errInLogout: err });
            res.redirect(req.query.next || '/');
        });
    } catch (err) {
        next(err);
    }
};

exports.viewProfile = async (req, res, next) => {
    try {
        res.render('profile', {
            session: req.session,
            user: req.session.role === 'BUYER' ? req.session.buyer : req.session.seller,
            userId: (req.session.buyer || req.session.seller)._id,
        });
    } catch (err) {
        next(err);
    }
};
