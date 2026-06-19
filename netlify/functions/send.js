const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse the body
  const { name, email, service, message } = JSON.parse(event.body);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `New Service Request from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Service: ${service}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email successfully sent!'
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'Something went wrong.'
    };
  }
};