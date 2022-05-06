import type { Request, Response } from 'express';

import { NodemailerMailAdapter } from '~/modules/Mail/adapters/nodemailer/NodemailerMailAdapter';

import { FeedbackType } from '../../repositories/dtos/FeedbacksDTO';
import { PrismaFeedbacksRepository } from '../../repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from '../../services/SubmitFeedbackService';

interface SubmitFeedbackControllerRequest {
  type: FeedbackType;
  comment: string;
  screenshot?: string;
}

export class FeedbackController {
  public async create(req: Request, res: Response) {
    const { type, comment, screenshot } =
      req.body as SubmitFeedbackControllerRequest;

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
