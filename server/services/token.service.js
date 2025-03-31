const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaClient");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const existToken = await prisma.token.findFirst({
      where: {
        userId,
      },
    });

    if (existToken) {
      return await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      });
    }

    return await prisma.token.create({
      data: { userId, refreshToken },
    });
  }

  async removeToken(refreshToken) {
    const tokenData = await prisma.token.findFirst({
      where: { refreshToken },
    });

    if (!tokenData) {
      throw new Error("Token not found");
    }

    return await prisma.token.delete({
      where: { id: tokenData.id },
    });
  }

  async findToken(refreshToken) {
    return await prisma.token.findFirst({
      where: { refreshToken },
    });
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
