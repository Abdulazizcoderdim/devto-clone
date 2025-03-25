const mailService = require("../services/mail.service");
const prisma = require("../config/prismaClient");
const BaseError = require("../errors/base.error");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user.dto");
const tokenService = require("../services/token.service");
const authService = require("../services/auth.service");

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

        res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res
          .status(200)
          .json({ user: userDto, accessToken: tokens.accessToken });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      console.log(req.cookies); // Cookie-larni ko‘ramiz
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({ accessToken: data.accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Successfully logged out" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      const userId = req.user.id; // Middleware orqali user ID olinadi
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw BaseError.BadRequest("User not found");
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
