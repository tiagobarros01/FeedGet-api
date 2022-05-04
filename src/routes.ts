import express, { Request, Response } from 'express';
import { PrismaFeedbacksRepository } from './modules/Feedbacks/repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from './modules/Feedbacks/services/SubmitFeedbackService';
import { NodemailerMailAdapter } from './modules/Mail/adapters/nodemailer/NodemailerMailAdapter';

export const routes = express.Router();

type ICreateFeedbackRequestDTO = {
  type: string;
  comment: string;
  screenshot?: string;
};

routes.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body as ICreateFeedbackRequestDTO;

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
});
