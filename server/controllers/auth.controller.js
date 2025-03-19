const { PrismaClient } = require('@prisma/client');
const mailService = require('../services/mail.service');
const prisma = new PrismaClient();

class AuthController {
  async login(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) {
        return next(BaseError.BadRequest('Email and password are required'));
      }

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
        return res.status(200).json({ user });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
