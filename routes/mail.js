// app.js 或 routes/mail.js
const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./mailer'); // 引入 mailer.js
const router = express.Router();

// 邮件发送路由
router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required fields: to, subject, or text' });
  }

  try {
    // 调用 sendMail 函数发送邮件
    await sendMail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

module.exports = router;
