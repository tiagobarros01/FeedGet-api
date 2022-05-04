import nodemailer from 'nodemailer';
import { SendMailDTO } from '../dtos/MailDTO';
import { MailAdapter } from '../MailAdapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ebf8e77f69911b',
    pass: '95459db82e6468',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailDTO) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Tiago Barros <tbarros1337@hotmail.com>',
      subject,
      html: body,
    });
  }
}
