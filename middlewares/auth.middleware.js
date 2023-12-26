const qs = require('node:querystring');
const { Unauthorized } = require('http-errors');

exports.populateSession = () => {
    return (req, res, next) => {
        try {
            req.session.isAuthenticated ??= false;
            next();
        } catch (err) {
            next(err);
        }
    };
};

exports.ensureNoAuth = ({ redirectUrl } = { redirectUrl: '/' }) => {
    return (req, res, next) => {
        try {
            const { isAuthenticated } = req.session;
            isAuthenticated ? res.redirect(redirectUrl) : next();
        } catch (err) {
            next(err);
        }
    };
};

exports.ensureAuth = ({ redirectUrl } = { redirectUrl: '/auth/login' }) => {
    return (req, res, next) => {
        try {
            const { isAuthenticated } = req.session;
            if (isAuthenticated) {
                next();
            } else {
                res.redirect(`${redirectUrl}?${qs.encode({ next: req.originalUrl })}`);
            }
        } catch (err) {
            next(err);
        }
    };
};

exports.ensureRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const presentRole = req.session.role;
            if (allowedRoles.includes(presentRole)) {
                next();
            } else {
                alert(`${presentRole} is not allowed to access that page.`);
                res.redirect('/');
                // throw new Unauthorized(`Role '${presentRole}' not allowed to view that resource`);
            }
        } catch (err) {
            next(err);
        }
    };
};
