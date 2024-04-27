const { verify } = require("jsonwebtoken");
const { response } = require("../utils/response");
const { secret } = require("../config/secret");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return await response({
      req,
      res,
      code: 401,
      msg: "Token tidak terlampir",
    });
  }

  try {
    const decoded = verify(token, secret);
    // req.userId = decoded;
    // console.log(decoded);
    next();
  } catch (err) {
    return await response({ req, res, code: 403, msg: err });
  }
};
