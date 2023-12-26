const { ZodError } = require('zod');
const { EditBuyerSchema } = require('./schemas/auth.schema');
const buyerService = require('../services/buyer.service');
const { InvalidLoginException, ExistsException } = require('../exceptions');

exports.editBuyerProfile = async (req, res, next) => {
    try {
        const { address, email, firstName, lastName, pinCode } = await EditBuyerSchema.parseAsync(
            req.body
        );

        await buyerService.edit({
            email,
            firstName,
            lastName,
            address,
            pinCode,
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
