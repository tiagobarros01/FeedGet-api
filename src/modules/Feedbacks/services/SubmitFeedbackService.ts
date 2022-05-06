import { MailAdapter } from '~/modules/Mail/adapters/MailAdapter';
import { AppError } from '~/shared/erros/AppError';

import { FeedbackType } from '../repositories/dtos/FeedbacksDTO';
import { FeedbacksRepository } from '../repositories/FeedbacksRepository';

interface SubmitFeedbackServiceProps {
  type: FeedbackType;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: SubmitFeedbackServiceProps) {
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new AppError({
        message: 'Invalid screenshot format',
        messageCode: 'invalid.screenshot.format',
      });
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}">` : '',
        '</div>',
      ].join('\n'),
    });
  }
}
