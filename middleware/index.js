
const jwtConfig = require("../config/secret.js");
const jwt = require("jsonwebtoken");
// 中间件：验证JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(403);
    }
    const t = token.split(" ")[1]
    jwt.verify(t, jwtConfig.jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log(user, 'user')
        req.user = user;
        next();
    });
};

module.exports = {
 authenticateJWT
}