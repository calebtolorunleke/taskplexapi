// middleware/authorization.js
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have permission to perform this action.'
            });
        }
        next();
    };
};

module.exports = authorize;
