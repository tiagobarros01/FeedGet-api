import { prisma } from '../../../../prisma';
import { CreateFeedbacksDTO } from '../dtos/FeedbacksDTO';
import { FeedbacksRepository } from '../FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: CreateFeedbacksDTO) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
