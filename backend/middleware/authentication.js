const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    // Extract the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        // Throw a generic error if the authentication is invalid
        throw new Error('Authentication invalid');
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token using the secret
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID and exclude the password
        const user = await User.findById(payload.userId).select('-password');

        // Attach the user to the request object
        req.user = { userId: payload.userId, name: payload.name };

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Throw a generic error if the token verification fails
        throw new Error('Authentication invalid');
    }
}

module.exports = auth;
