require('dotenv').config();

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
const { populateSession } = require('./middlewares/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: true,
    })
);
app.use(cookieParser('EnvelopeSecure'));

app.use(fileUpload());
app.use(express.static('public'));

app.use(populateSession());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set("layout checkPackage", false);
// routers
app.use(require('./routers/default.router').defaultRouter);
app.use(require('./routers/auth.router').authRouter);
app.use(require('./routers/product.router').productRouter);
app.use(require('./routers/tag.router').tagRouter);
app.use(require('./routers/cart-product.router').cartProductRouter);
app.use(require('./routers/odop.router').odopRouter);
app.use(require('./routers/review.router').reviewRouter);
app.use(require('./routers/buyer.router').buyerRouter);
app.use(require('./routers/seller.router').sellerRouter);
app.use(require('./routers/envelopeRouter')); // TODO: get rid of this completely

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req.url);
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
