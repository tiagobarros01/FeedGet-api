import express, { Request, Response } from 'express';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

type ICreateFeedbackRequestDTO = {
  type: string;
  comment: string;
  screenshot?: string;
};

app.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body as ICreateFeedbackRequestDTO;

  const createdFeedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  return res.status(201).json(createdFeedback);
});

app.listen(3333, () => console.log('Server is running at port 3333 🔥'));
