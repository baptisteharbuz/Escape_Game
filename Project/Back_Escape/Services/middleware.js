require('dotenv').config();
const jwt = require('jsonwebtoken');

const createCheckTokenMiddleware = ({ secret = process.env.SECRET, onError } = {}) => {
    return (req, res, next) => {
        const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
        if (!token) {
            return res.status(401).json({ message: 'Token inexistant' });
        }
        jwt.verify(token, secret, (err) => {
            if (err) {
                if (onError && typeof onError === 'function') {
                    return onError(err, req, res, next);
                }
                return res.status(401).json({ message: 'Error. Mauvais token' });
            }
            next();
        });
    };
};

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false;
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
};

const checkTokenMiddleware = createCheckTokenMiddleware({
    secret: process.env.SECRET,
    onError: (err, req, res, next) => {
        console.error(err);
        res.status(401).json({ message: 'Accès refusé. Token invalide ou expiré.' });
    }
});

module.exports = {
    checkTokenMiddleware
};
