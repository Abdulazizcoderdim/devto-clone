const mailService = require("../services/mail.service");
const prisma = require("../config/prismaClient");
const BaseError = require("../errors/base.error");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user.dto");
const tokenService = require("../services/token.service");
const authService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return next(
          BaseError.BadRequest("Name, email and password are required")
        );
      }

      const existUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        return next(BaseError.BadRequest("User already exists"));
      }

      const existName = await prisma.user.findUnique({
        where: {
          name,
        },
      });

      if (existName) {
        return next(BaseError.BadRequest("Name already exists"));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
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

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(BaseError.BadRequest("Email and password are required"));
      }

      const existUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        const checkPassword = await bcrypt.compare(
          password,
          existUser.password
        );

        if (!checkPassword) {
          return next(BaseError.BadRequest("Password is incorrect"));
        }

        const userDto = new UserDto(existUser);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          // secure: true,
          // sameSite: "None",
          // path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken: tokens.accessToken });
      }

      return next(BaseError.BadRequest("User not found"));
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
          // secure: true,
          // sameSite: "None",
          // path: "/",
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
      const { refreshToken } = req.cookies;

      if (!refreshToken)
        return res.status(401).json({ message: "No refresh token provided" });

      const data = await authService.refresh(refreshToken);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
        // path: "/",
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
