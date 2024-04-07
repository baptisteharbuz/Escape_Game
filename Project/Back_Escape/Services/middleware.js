require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET;

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

// Vérification du token
const checkTokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Token inexistant' });
    }

    try {
        const decodedToken = await jwt.verify(token, jwtSecret);
        req.user = decodedToken.user;
        next();
    } catch (err) {
        let message = 'Error. Mauvais token';
        if (err instanceof jwt.TokenExpiredError) {
            message = 'Error. Token expiré';
        } else if (err instanceof jwt.JsonWebTokenError) {
            message = 'Error. Token invalide';
        }
        res.status(401).json({ message });
    }
};


module.exports = {
    checkTokenMiddleware
}