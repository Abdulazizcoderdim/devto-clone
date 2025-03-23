const mailService = require("../services/mail.service");
const prisma = require("../config/prismaClient");
const BaseError = require("../errors/base.error");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user.dto");
const tokenService = require("../services/token.service");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(BaseError.BadRequest("Email and password are required"));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const existUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        await mailService.sendOtp(existUser.email);

        return res.status(200).json({ email: existUser.email });
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      await mailService.sendOtp(newUser.email);
      return res.status(200).json({ email: newUser.email });
    } catch (error) {
      next(error);
    }
  }

  async verify(req, res, next) {
    try {
      const { email, otp } = req.body;
      const result = await mailService.verifyOtp(email, otp);
      if (result) {
        const user = await prisma.user.update({
          where: {
            email,
          },
          data: {
            isVerified: true,
          },
        });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return res.status(200).json({ userDto, ...tokens });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
