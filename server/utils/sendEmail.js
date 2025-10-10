const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (to, link) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NewsApp" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Please click the following link to reset your password. The link is valid for 1 hour.</p>
        <a href="${link}">${link}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    console.log("Password reset email sent successfully to:", to);
  } catch (error) {
    console.error("Email not sent:", error);
  }
};

module.exports = sendPasswordResetEmail;