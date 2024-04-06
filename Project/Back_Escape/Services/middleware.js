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
const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Token inexistant' })
    }

    // Véracité du token
    jwt.verify(token, jwtSecret, (err) => {
        if (err) {
            res.status(401).json({ message: 'Error. Mauvais token' })
        } else {
            return next()
        }
    })
}

module.exports = {
    checkTokenMiddleware
}