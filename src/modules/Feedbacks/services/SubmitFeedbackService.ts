import { FeedbacksRepository } from '../repositories/FeedbacksRepository';

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(data: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = data;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
  }
}
