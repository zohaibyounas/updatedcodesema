import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { customerEmail, customerName, title } = await request.json();

    // Extract the base title before the colon
    const baseTitle = title.split(":")[0].trim();

    // Define email content based on the base title
    let emailContent = "";

    switch (baseTitle) {
      case "Einzelkarte":
        emailContent = `
          <h3>Hello ${customerName.toUpperCase()}</h3>
          <p>Herzlichen Glückwunsch zu deiner großartigen Entscheidung! Mit deiner „Einzelkarte“ wirst du den Geschmack von einer Stunde intensiven Trainings kennenlernen. Ich freue mich schon darauf, dich bei meinen Kursen zu sehen und gemeinsam an deinen Fitnesszielen zu arbeiten.<br></p>
          <p>Wenn du Fragen hast, stehe ich dir jederzeit zur Verfügung und du kannst mir gerne eine E-Mail schreiben.<br><br></p>
          <p>Bis ganz bald!<br></p>
          <p>Deine Trainerin,</p>
          <p>Sema 🫶🏼</p>
        `;
        break;
      case "5er Karte":
        emailContent = `
          <h3>Hello ${customerName.toUpperCase()}</h3>
          <p>Mit deiner „5er Karte“ werden wir die Matte ordentlich rocken! Ich freue mich schon darauf, dich bei meinen Kursen zu sehen und gemeinsam an deinen Fitnesszielen zu arbeiten.<br></p>
          <p>Wenn du Fragen hast, stehe ich dir jederzeit zur Verfügung und du kannst mir gerne eine E-Mail schreiben.<br><br></p>
          <p>Bis ganz bald!<br></p>
          <p>Deine Trainerin,</p>
          <p>Sema 🫶🏼</p>
        `;
        break;
      case "10er Karte":
        emailContent = `
          <h3>Hello ${customerName.toUpperCase()}</h3>
          <p>Mit deiner „10er Karte“ hast du die perfekte Entscheidung getroffen! Mit deiner zusätzlichen Gratisstunde wird es noch spannender. Ich freue mich schon darauf, dich bei meinen Kursen zu sehen und gemeinsam an deinen Fitnesszielen zu arbeiten.<br></p>
          <p>Wenn du Fragen hast, stehe ich dir jederzeit zur Verfügung und du kannst mir gerne eine E-Mail schreiben.<br><br></p>
          <p>Bis ganz bald!<br></p>
          <p>Deine Trainerin,</p>
          <p>Sema 🫶🏼</p>
        `;
        break;
      case "Privat Class":
        emailContent = `
          <h3>Hello ${customerName.toUpperCase()}</h3>
          <p>Deine Entscheidung für eine „Privat Class“ zeigt dein Engagement für deine Ziele. Ich freue mich darauf, intensiv mit dir an deinen individuellen Zielen zu arbeiten.<br></p>
          <p>Wenn du Fragen hast, stehe ich dir jederzeit zur Verfügung und du kannst mir gerne eine E-Mail schreiben.<br><br></p>
          <p>Bis ganz bald!<br></p>
          <p>Deine Trainerin,</p>
          <p>Sema 🫶🏼</p>
        `;
        break;
      case "Core-Kurs":
        emailContent = `
          <h3>Hello ${customerName.toUpperCase()}</h3>
          <p>Der „Core-Kurs“ wird dich an deine Grenzen bringen und dir helfen, deine Körpermitte zu stärken. Ich freue mich schon darauf, gemeinsam mit dir an deiner Core-Stärke zu arbeiten!<br></p>
          <p>Wenn du Fragen hast, stehe ich dir jederzeit zur Verfügung und du kannst mir gerne eine E-Mail schreiben.<br><br></p>
          <p>Bis ganz bald!<br></p>
          <p>Deine Trainerin,</p>
          <p>Sema 🫶🏼</p>
        `;
        break;
      default:
        emailContent = `
          <h3>Hello ${customerName.toUpperCase()}</h3>
          <p>Herzlichen Glückwunsch zu deiner großartigen Entscheidung! Ich freue mich schon darauf, dich bei meinen Kursen zu sehen und gemeinsam an deinen Fitnesszielen zu arbeiten.<br></p>
          <p>Wenn du Fragen hast, stehe ich dir jederzeit zur Verfügung und du kannst mir gerne eine E-Mail schreiben.<br><br></p>
          <p>Bis ganz bald!<br></p>
          <p>Deine Trainerin,</p>
          <p>Sema 🫶🏼</p>
        `;
        break;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.strato.com",
      port: 465,
      secure: true,
      auth: {
        user: "sema@body-mirror.com",
        pass: "@Semabm123@",
      },
    });

    const mailOptions = {
      from: "sema@body-mirror.com",
      to: customerEmail,
      subject: "Großartige Entscheidung! Jetzt wird es spicy 🌶️",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

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
