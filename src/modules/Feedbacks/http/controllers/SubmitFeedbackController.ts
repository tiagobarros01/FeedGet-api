import type { Request, Response } from 'express';
import { NodemailerMailAdapter } from '../../../Mail/adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from '../../repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from '../../services/SubmitFeedbackService';

type ICreateFeedbackRequest = {
  type: string;
  comment: string;
  screenshot?: string;
};

export class FeedbackController {
  public async create(req: Request, res: Response) {
    const { type, comment, screenshot } = req.body as ICreateFeedbackRequest;

    console.log({ type, comment, screenshot });

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackService.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();
  }
}
