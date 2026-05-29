const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Use a generic SMTP transport (e.g. ethereal or sendgrid)
  // For dev, we could use ethereal. For production, sendgrid.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER || 'ethereal_user',
      pass: process.env.EMAIL_PASS || 'ethereal_pass',
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
