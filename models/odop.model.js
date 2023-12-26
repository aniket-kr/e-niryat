const mongoose = require('mongoose');
const {
    Schema: { Types },
} = require('mongoose');
const { default: slugify } = require('slugify');

const odopSchema = new mongoose.Schema({
    slug: {
        type: Types.String,
        required: true,
        default: function(){
            return slugify(`${this.blogTitle} ${Date.now()}`)
        }
        },

    blogTitle: {
        type: Types.String,
        required: true
    },

    blogDescription: {
        type: Types.String,
        required: true
    },

    author: {
        type: Types.String,
        required: true
    },

    dateBlog: {
        type: Types.Date,
        required: true,
        default: function()
        {
            return new Date();
        }
    },

    quotes: {
        type: Types.String,
        required: true
    },

})

const OdopModel = mongoose.model('Odop', odopSchema);
module.exports = OdopModel;
