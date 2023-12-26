const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
// 'mongodb://localhost:27017/eNiryat'
mongoose.connect(process.env.MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected');
});

// models
require('./seller.model');
require('./buyer.model');
require('./product.model');
require('./tag.model');
require('./cart-product.model');
require('./review.model');
require('./order-product.model');
require('./odop.model');
module.exports = db;
