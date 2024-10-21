import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, message, option } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.strato.com",
      port: 465,
      secure: true,
      auth: {
        user: "sema@body-mirror.com",
        pass: "@Semabm123@",
      },
    });

    const mailOptionsToSema = {
      from: "sema@body-mirror.com",
      to: "sema@body-mirror.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `
      Name: ${name}
      Email: ${email}
      Betreff: ${subject}
      Nachricht: ${message}
      Ich möchte: ${option}
    `,
    };

    // Email to the customer
    const mailOptionsToCustomer = {
      from: "sema@body-mirror.com",
      to: email,
      subject: "Your message has been received",
      text: `
Dear ${name},

Thank you for getting in touch with us. We have received your message and will get back to you as soon as possible.

Here are the details we received from you:
Name: ${name}
Email: ${email}
Betreff: ${subject}
Nachricht: ${message}
Ich möchte: ${option}

Best regards,
Sema Taskin
`,
    };

    await transporter.sendMail(mailOptionsToSema);
    await transporter.sendMail(mailOptionsToCustomer);

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
