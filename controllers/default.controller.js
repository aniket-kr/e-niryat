const productService = require('../services/product.service');
const pdfService = require('../services/pdf.service');

const orderProductService = require('../services/order-product.service');

const path = require('node:path');

exports.home = async (req, res, next) => {
    try {
        const products = await productService.latestProducts();
        const productas = await productService.mostBoughtProduct();
        res.render('index', {
            title: 'eNiryat: Home',
            session: req.session,
            products: products,
            productas: productas,
        });
    } catch (err) {
        next(err);
    }
};

exports.downloadPdf = async (req, res, next) => {
    try {
        const { orderId, productId } = req.query;
        const orderProduct = await orderProductService.findProductFromOrder(orderId, productId);

        const { seller } = orderProduct.product;
        const pdfBuffer = await pdfService.toPdfBuffer('./views/templates/pdfGen.ejs', {
            sellerFullName: seller.fullName,
            sellerAddress: seller.address,
            sellerPincode: seller.pinCode,
            productName: orderProduct.product.name,
            productQuantity: orderProduct.quantity,
            buyerFullName: orderProduct.buyer.fullName,
            buyerAddress: orderProduct.buyer.address,
            buyerPincode: orderProduct.buyer.pinCode,
            orderId,
            deliveryMode: 'International Air Parcel',
            weight: orderProduct.product.specs.weight,
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition',   `attachment; filename=${orderId}.pdf`);
        res.setHeader('Content-Length', pdfBuffer.length);

        res.send(pdfBuffer);
    } catch (err) {
        next(err);
    }
};
