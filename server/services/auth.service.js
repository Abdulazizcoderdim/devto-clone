const prisma = require("../config/prismaClient");
const UserDto = require("../dtos/user.dto");
const BaseError = require("../errors/base.error");
const tokenService = require("./token.service");

class AuthService {
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError("Bad authorization");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);

    if (!userPayload || !tokenDb) {
      throw BaseError.UnauthorizedError("Bad authorization");
    }

    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
    });
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }
}

module.exports = new AuthService();
