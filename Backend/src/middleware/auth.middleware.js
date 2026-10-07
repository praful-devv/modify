const jwt = require("jsonwebtoken");
const redis = require("../config/cache")
const identiUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    })
  }
 
  const isTokenBlacklisted = await redis.get(token)

  if(isTokenBlacklisted){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.JWT_SECRETS);

    req.user = decode;
    next()

  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
module.exports = {identiUser}