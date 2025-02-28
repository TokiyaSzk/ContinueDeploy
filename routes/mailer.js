// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// 使用 SMTP 配置创建邮件发送的 transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  // 使用环境变量中的 SMTP 主机
  port: process.env.SMTP_PORT,  // 使用环境变量中的 SMTP 端口
  secure: true,  // 如果端口是 465，使用 SSL/TLS 加密
  auth: {
    user: process.env.SMTP_USER,  // 使用环境变量中的邮箱地址
    pass: process.env.SMTP_PASS,  // 使用环境变量中的密码或应用专用密码
  },
});

// 创建发送邮件的函数
function sendMail(to, subject, text) {
  console.log({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
  });
  const mailOptions = {
    from: process.env.SMTP_USER, // 发件人邮箱，使用环境变量
    to,  // 收件人邮箱
    subject,  // 邮件主题
    text,  // 邮件内容
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendMail;
