const { DoesNotExistException } = require('../exceptions');
const odopService = require('../services/odop.service');



exports.getBlogBySlug = async (req, res, next) => {
    try {
        const { blogSlug: slug } = req.params;
        const blog = await odopService.ensureBlogExists(slug);
        
        res.render('single-blog', { blog ,session: req.session });
    } catch (err) {
        if (err instanceof DoesNotExistException) {
            next('route'); // handle 404
        }
        next(err);
    }
    };