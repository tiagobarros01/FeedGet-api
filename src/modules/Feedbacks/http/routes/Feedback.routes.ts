import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { FeedbackTypes } from '../../repositories/dtos/FeedbacksDTO';
import { FeedbackController } from '../controllers/SubmitFeedbackController';

export const feedbackRouter = Router();

const feedbackController = new FeedbackController();

feedbackRouter.post(
  '/',
  celebrate({
    body: {
      type: Joi.string()
        .valid(...FeedbackTypes)
        .required(),
      comment: Joi.string().required(),
      screenshot: Joi.string(),
    },
  }),
  feedbackController.create
);
