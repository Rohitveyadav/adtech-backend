const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(404).json({
                    message: 'Token Expired',
                });
            } else {
                return res.status(404).json({
                    message: 'Token Invalid',
                });
            }
        }
        req.user = user.jti;
        next();
    });
};

module.exports = { authenticateToken };
