import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, message, option } = await request.json();

    // Create a transporter with the email service details.
    const transporter = nodemailer.createTransport({
      host: "smtp.strato.com",
      port: 465,
      secure: true,
      auth: {
        user: "sema@body-mirror.com",
        pass: "@Semabm123@", // Replace with your actual password
      },
    });

    // Compose the email to send to Sema with all the user's form data.
    const mailOptionsToSema = {
      from: "sema@body-mirror.com",
      to: "sema@body-mirror.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        You have received a new message from the contact form on your website.

        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        Option: ${option}
      `,
    };

    // Send the email to Sema.
    await transporter.sendMail(mailOptionsToSema);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
