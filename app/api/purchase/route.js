import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { customerEmail, customerName, title, day, courseTime, bookingTime } =
      await request.json();

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
      subject: `Purchase of the Course by ${customerName}`,
      text: `
  Dear Sema Taskin,

  You have a new course booking from a customer.

  Customer Details:
  Name: ${customerName}
  Email: ${customerEmail}

  Course Details:
  Title: ${title}
  Day: ${day}
  Time: ${courseTime}

  Booking Time: ${bookingTime}

  The customer has successfully booked this course. Please make sure to follow up with them for any additional information or assistance they may need.

  Best regards,
  Sema Taskin
  `,
    };

    await transporter.sendMail(mailOptionsToSema);

    return NextResponse.json(
      { message: "Purchase email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send purchase email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
