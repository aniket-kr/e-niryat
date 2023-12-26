const { DoesNotExistException } = require('../exceptions');

const OdopModel = require('../models/odop.model');


exports.ensureBlogExists = async (slug) => {
    const blogs = await OdopModel.findOne({ slug });
    if (!blogs) {
        throw new DoesNotExistException(`Blog "${slug}" does not exist`);
    }
    return blogs;
};