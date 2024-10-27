import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor(private configservice: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // Puerto SMTP seguro para Gmail
      secure: true, // true para conexiones seguras
      auth: {
        user: process.env.SMTP_USER, // tu correo
        pass: process.env.SMTP_PASS, // tu contraseña o app password
      },
    });
  }

  async sendEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string,
  ) {
    const mailOptions = {
      from: '"Impact Social Cup"',
      to,
      subject,
      text,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
