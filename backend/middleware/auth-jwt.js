const jwt = require("jsonwebtoken");

// Middleware for token verification
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Get specific header
    if (token == null) {
        return res.sendStatus[401];
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.sendStatus[403];
    }
    return next();
}

const authJwt = {
    verifyToken,
};

module.exports = authJwt;
