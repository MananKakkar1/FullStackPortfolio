import nodemailer from "nodemailer";
import cors from "cors";
import express from "express";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

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
    console.log("Email sent successfully");
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.error("Error sending email:", error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

export default function handler(req, res) {
  res.status(200).json({ message: "Hello from Vercel backend!" });
}