const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(BaseError.BadRequest('Email and password are required'));
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        return next(BaseError.BadRequest('User not found'));
      }
    } catch (error) {
      next(error);
    }
  }
}
