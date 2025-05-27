import nodemailer from "nodemailer";
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Contact from ${name} <${email}>`,
      text: message,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.error("Error sending email:", error);
  }
});
