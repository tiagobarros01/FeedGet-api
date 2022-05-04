import { SendMailDTO } from './dtos/MailDTO';

export interface MailAdapter {
  sendMail(data: SendMailDTO): Promise<void>;
}
