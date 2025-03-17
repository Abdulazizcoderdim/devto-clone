const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

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
  }
}
