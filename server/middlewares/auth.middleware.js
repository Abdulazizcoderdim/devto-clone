const jwt = require("jsonwebtoken");
const BaseError = require("../errors/base.error");
const { PrismaClient } = require("@prisma/client");
const tokenService = require("../services/token.service");
const prisma = new PrismaClient();

module.exports = function (req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw BaseError.Unauthorized();
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw BaseError.Unauthorized();
    }

    const userPayload = tokenService.validateAccessToken(token);
    if (!userPayload) {
      throw BaseError.Unauthorized("Invalid token");
    }

    // const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    // if (!userId) {
    //   return next(BaseError.Unauthorized());
    // }

    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });
    // if (!user) {
    //   return next(BaseError.Unauthorized());
    // }
    console.log("userPayload", userPayload);

    req.user = userPayload;
    next();
  } catch (error) {
    next(error);
  }
};
