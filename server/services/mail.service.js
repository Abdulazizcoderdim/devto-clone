const nodemailer = require('nodemailer');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

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
}

module.exports = new MailService();
