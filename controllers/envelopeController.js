require('../models/database');
const Buyer = require('../models/buyer.model');
const Seller = require('../models/seller.model');
const bcrypt = require('bcrypt');

exports.homepage = async (req, res) => {
    try {
        res.render('index', { title: 'Envelope - Home', session: req.session });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.loginUser = async (req, res) => {
    const infousersObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('login', { title: 'Login', infousersObj, infoSubmitObj });
};

exports.loginUserOnPost = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Login.findOne({ username });

        if (!user) {
            return res.render('login', {
                errors: ['Invalid username or password'],
                username,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.render('login', {
                errors: ['Invalid username or password'],
                username,
            });
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('login', {
            errors: ['An error occurred. Please try again.'],
            username,
        });
    }
};

exports.registerUser = (req, res) => {
    res.render('registrations');
};

exports.registerUserOnPost = async (req, res) => {
    const { username, password, role } = req.body;
    console.log('Received data:', req.body);

    try {
        const existingUser = await Login.findOne({ username });

        if (existingUser) {
            req.flash('infoErrors', 'Username already exists. Please choose another.');
            return res.redirect('/registration');
        }

        const newUser = new Login({
            username,
            password,
            role,
            buyerDetails: role === 'buyer' ? req.body : undefined,
            sellerDetails: role === 'seller' ? req.body : undefined,
        });

        console.log(newUser);
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('infoErrors', 'Error registering user');
        res.redirect('/registration');
    }
};

exports.shopCategory = async (req, res) => {
    try {
        res.render('category', { title: 'Shop - Category' });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.singleProduct = async (req, res) => {
    try {
        res.render('single-product', { title: 'Shop - Product' });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.checkout = async (req, res) => {
    try {
        if (req.session.isAuthenticated === true) {
            res.render('checkout', { title: 'Shop - Checkout', session: req.session });
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.cart = async (req, res) => {
    try {
        res.render('cart', { title: 'Shop - Cart', session: req.session });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};
exports.confirmation = async (req, res) => {
    try {
        res.render('confirmation', { title: 'Shop - Confirmation', session: req.session });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.blog = async (req, res) => {
    try {
        res.render('blog', { title: 'Shop - Blog', session: req.session });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.singleBlog = async (req, res) => {
    try {
        res.render('single-blog', { title: 'Shop - Blog', session: req.session });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.tracking = async (req, res) => {
    try {
        res.render('tracking', { title: 'Order - Tracking', session: req.session });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.contact = async (req, res) => {
    try {
        res.render('contact', { title: 'Shop - Contact', session: req.session });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.elements = async (req, res) => {
    try {
        res.render('elements', { title: 'Shop - Contact', session: req.session });
        7;
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.productList = async (req, res) => {
    try {
        res.render('product-listing', { title: 'Shop - Contact', session: req.session });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.sellerDashboard = async (req, res) => {
    try {
        res.render('seller-dashboard', { title: 'seller - Dashboard', session: req.session });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

exports.checkPackage = async (req, res) => {
    try {
        res.render('checkPackage', { title: 'Parcel Checker', session: req.session ,layout: 'checkPackage'});
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured' });
    }
};

