const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const BaseError = require("../errors/base.error");
const prisma = new PrismaClient();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendOtp(to) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit otp
    console.log(otp);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await prisma.otp.create({
      data: {
        email: to,
        otp: hashedOtp,
        expireAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `OTP for verification ${new Date().toLocaleString()}`,
      html: `<h1>Your OTP is ${otp}</h1>`,
    });
  }

  async verifyOtp(email, otp) {
    const otpData = await prisma.otp.findFirst({
      where: {
        email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpData) throw BaseError.BadRequest("Otp not found");

    if (new Date() > otpData.expireAt)
      throw BaseError.BadRequest("Otp expired");

    const isValid = await bcrypt.compare(otp.toString(), otpData.otp);
    if (!isValid) throw BaseError.BadRequest("Invalid Otp entered");

    await prisma.otp.deleteMany({
      where: {
        email,
      },
    });
    return true;
  }
}

module.exports = new MailService();
