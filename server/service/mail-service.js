import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class MailService {
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активація акаунта на ${process.env.API_URL}`,
      text: '',
      html:
      `
        <div>
          <h1>Для активації перейдіть по посиланню</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }

  async sendResume(formResponse) {
    const {
      fullName,
      phone,
      email,
      experienceYears,
      education,
      about,
      availability,
      profileLink,
      motivation
    } = formResponse;

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Нове заявка на працевлаштування від ${fullName}`,
      text: '',
      html:
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Нова заявка на працевлаштування</h2>
          <p><strong>ПІБ:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Досвід роботи (років):</strong> ${experienceYears}</p>
          <p><strong>Освіта:</strong> ${education}</p>
          <p><strong>Про себе:</strong> ${about}</p>
          <p><strong>Бажання працювати:</strong> ${availability}</p>
          <p><strong>Посилання на профіль/резюме:</strong> <a href="${profileLink}" target="_blank">${profileLink}</a></p>
          <p><strong>Мотивація:</strong> ${motivation}</p>
        </div>
      `
    })
  }
}

export default new MailService();
