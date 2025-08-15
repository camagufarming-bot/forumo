import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "1025"),
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
});

export async function sendEmail({ to, subject, html }) {
  const from = process.env.EMAIL_FROM || "Forumo <no-reply@forumo.local>";
  return transporter.sendMail({ from, to, subject, html });
}
