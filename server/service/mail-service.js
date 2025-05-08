import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

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
    });

    const imagePath = path.join(__dirname, '..', 'images');
    this.logoSvg   = fs.readFileSync(path.join(imagePath, 'logo.svg'), 'utf8');
    this.otterPng  = fs.readFileSync(path.join(imagePath, 'otter-gift.png'));
    this.logoDataUri  = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.logoSvg)}`;
    this.otterDataUri = `data:image/png;base64,${this.otterPng.toString('base64')}`;
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

  async sendGift({ to, from, email, amount, expirationDate, code }) {
    const templatePath = path.join(__dirname, '..', 'templates', 'certificate.ejs');

    const html = await ejs.renderFile(templatePath, {
      to,
      from,
      amount,
      expirationDate,
      code,
      logoDataUri: this.logoDataUri,
      otterDataUri: this.otterDataUri
    });

    const browser = await (await import('puppeteer')).launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
    });
    await browser.close();

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Ваш подарунковий сертифікат',
      text: 'Будь ласка, відкрийте прикріплений PDF для перегляду сертифіката.',
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        }
      ],
    });
  }
}

export default new MailService();
