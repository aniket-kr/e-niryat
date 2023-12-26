const cartProductService = require('../services/cart-product.service');
const orderProductService = require('../services/order-product.service');



exports.getCart = async (req, res, next) => {
    try {
        const { buyer } = req.session;
        const cart = await cartProductService.getBuyerCart(buyer);
        res.render('cart', { session: req.session, cartProducts: cart });
    } catch (err) {
        next(err);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const { productSlug, quantity } = req.query;
        const { buyer } = req.session;
        await cartProductService.addProduct(buyer, productSlug, parseInt(quantity, 10) || 1);

        res.redirect('/cart');
    } catch (err) {
        next(err);
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const { buyer } = req.session;
        const { data: encodedData } = req.query;
        const data = JSON.parse(decodeURIComponent(encodedData));
        await Promise.all(
            Object.keys(data).map(async (slug) => {
                const qty = data[slug];
                await cartProductService.updateQuantity(buyer, slug, qty);
            })
        );

        res.redirect('/cart');
    } catch (err) {
        next(err);
    }
};

exports.checkoutCart = async (req, res, next) => {
    try {
        const { buyer } = req.session;
        const cartProducts = await cartProductService.getBuyerCart(buyer);
        if (cartProducts.length <= 0) {
            res.redirect('/products');
        } else {
            const orderedProducts = await orderProductService.createOrderFromCart(
                cartProducts,
                buyer
            );
            await cartProductService.clearCart(buyer);
            const orderId = orderedProducts[0].orderId;
            const accountSid = 'ACa1defcfec9011b6d21fc69caeaf79106';
            const authToken = '19a27db387104e6d34c2597206498912';
            const client = require('twilio')(accountSid, authToken);
           
            client.messages
                .create({
                    body: 'Hello $SellerId you have recieved a new order check it on the website http://13.233.102.8:5050/',
                    from: '+12058946894',
                    to: '+918149000556'
                    //to: '+919619382015'
                })
                .then(message => console.log(message.sid));
            res.redirect(`/tracking?orderId=${orderId}`);
        }
    } catch (err) {
        next(err);
    }
};
