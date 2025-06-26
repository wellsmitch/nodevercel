var { expressjwt } = require("express-jwt");
const jwtConfig = require("../config/secret.js");

const jwtMiddleware = expressjwt({
 secret: jwtConfig.jwtSecret,
 algorithms: ["HS256"],
 isRevoked(req) {
  console.log('req>>>>>>>>>>>>>>>', req)
  return false
 }
})
module.exports= jwtMiddleware