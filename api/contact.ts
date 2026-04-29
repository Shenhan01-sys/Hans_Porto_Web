import { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${name}`,
            text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        });

        res.json({
            success: true,
            message: "Thank you for your message! I'll get back to you soon.",
        });
    } catch (error: any) {
        console.error("Contact form error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later.",
            error: error.message,
        });
    }
}
