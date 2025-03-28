const jwt = require("jsonwebtoken");
const BaseError = require("../errors/base.error");
const { PrismaClient } = require("@prisma/client");
const tokenService = require("../services/token.service");
const prisma = new PrismaClient();

module.exports = function (req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw BaseError.Unauthorized(
        "Authorization header is missing or invalid"
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw BaseError.Unauthorized("Token is missing");
    }

    const userPayload = tokenService.validateAccessToken(token);
    if (!userPayload) {
      throw BaseError.Unauthorized("Invalid token");
    }

    console.log("userPayload", userPayload);

    req.user = userPayload;
    next();
  } catch (error) {
    next(error);
  }
};
