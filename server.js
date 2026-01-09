const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

/* Parse form data */
app.use(bodyParser.urlencoded({ extended: true }));

/* Serve all HTML files */
app.use(express.static("public"));

/* Visa form submission */
app.post("/submit-visa", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    departing,
    returning,
    purpose,
    destination,
    message
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Divinegodventuresltd@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: "Divinegodventuresltd@gmail.com",
    subject: "New Visa Application - Divine God Ventures",
    text: `
NEW VISA APPLICATION

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Departing: ${departing}
Returning: ${returning}
Purpose: ${purpose}
Destination: ${destination}

Message:
${message}
`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send(`
      <h2>Application Submitted Successfully</h2>
      <p>Thank you for contacting Divine God Ventures Limited.</p>
      <a href="/visa.html">Back to Visa Page</a>
    `);
  } catch (error) {
    console.error(error);
    res.send("Error sending email. Please try again later.");
  }
});

/* Start server */
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
