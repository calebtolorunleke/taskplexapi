// middleware/authentication.js
// Middleware to verify JWT access token from login
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Expecting the token in format: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization failed. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token with the secret key
        const payload = jwt.verify(token, process.env.jwt_secret);

        // Attach user details from token payload to request object
        req.user = { userId: payload.userId, name: payload.name, role: payload.role };

        // Continue to the next middleware/route
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Authentication failed. Invalid or expired token.' });
    }
};

module.exports = auth;
