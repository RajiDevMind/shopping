const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendEmail = async (subject, send_to, template, reply_to, cc) => {
  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Create template with Mailgen
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sellout Website",
      link: "http://bit.ly/raji",
      logo: "https://ibb.co/0y5xgKb",
    },
  });
  const emailTemplate = mailGenerator.generate(template);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8"); // preview before sending

  // Options for sending email
  const options = {
    from: process.env.EMAIL_USER,
    to: send_to,
    reply_To: reply_to,
    subject,
    html: emailTemplate,
    cc,
  };

  // Send mail
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
