import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor(private configservice: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configservice.get('EMAIL_HOST'),
      port: this.configservice.get('EMAIL_PORT'),
      secure: this.configservice.get('EMAIL_SECURE'),
      auth: {
        user: this.configservice.get('EMAIL_USER'),
        pass: this.configservice.get('EMAIL_PASS'),
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
      text: `Email enviada da: ${from} \n\n${text}`,
      html,
    };
    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error);
    }
  }
}
