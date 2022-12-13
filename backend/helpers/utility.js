const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
//const RefreshToken = require("../models/Token");

const { v4: uuidv4 } = require("uuid");

const getUniqueId = () => {
  return uuidv4();
};

const getTime = () => {
  return Date.now();
};

module.exports = {
  // getRefreshToken,
  hash,
  // generateJwtToken,
  // generateRefreshToken,
  randomTokenString,
  setTokenCookie,
  padNumber,
  getUniqueId,
  getTime,
};

function padNumber(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// async function getRefreshToken(_token) {
//   const { token } = _token;
//   const refreshToken = await RefreshToken.findOne({ token }).populate("user");
//   if (!refreshToken || !refreshToken.isActive) {
//     throw "Invalid token";
//   }
//   return refreshToken;
// }

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

// function generateJwtToken(user) {
//   return jwt.sign(
//     {
//       sub: user.id,
//       id: user.id,
//       role: user.role,
//       company: user.company,
//     },
//     process.env.SECRET_KEY,
//     { expiresIn: "30m" }
//   );
// }

// function generateRefreshToken(user, ipAddress) {
//   // create a refresh token that expires in 7 days
//   return new RefreshToken({
//     user: user.id,
//     token: randomTokenString(),
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     createdByIp: ipAddress,
//   });
// }

function randomTokenString() {
  return crypto.randomBytes(4).toString("hex").toLocaleUpperCase();
}

function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}
