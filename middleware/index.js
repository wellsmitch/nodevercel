
const jwtConfig = require("../config/secret.js");
const jwt = require("jsonwebtoken");
// 中间件：验证JWT 生成的token前面，必须拼接 Bearer 这个字符串。
//在HTTP请求中，Authorization请求头用于验证用户身份，其格式为Authorization: <type> <authorization-parameters>，其中<type>指的是认证的方式，而Bearer是这种格式中的一种类型，用于表示授权的类型‌
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(403);
    }
    const t = token&&token.split(" ")[1]
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