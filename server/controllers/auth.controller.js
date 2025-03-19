const { PrismaClient } = require('@prisma/client');
const mailService = require('../services/mail.service');
const prisma = new PrismaClient();

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
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
    } catch (error) {
      next(error);
    }
  }
}
