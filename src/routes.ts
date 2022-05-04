import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from './modules/Feedbacks/repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from './modules/Feedbacks/services/SubmitFeedbackService';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ebf8e77f69911b',
    pass: '95459db82e6468',
  },
});

type ICreateFeedbackRequestDTO = {
  type: string;
  comment: string;
  screenshot?: string;
};

routes.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body as ICreateFeedbackRequestDTO;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository
  );

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  // const createdFeedback = await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Tiago Barros <tbarros1337@hotmail.com>',
  //   subject: 'New feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n'),
  // });

  return res.status(201).send();
});
