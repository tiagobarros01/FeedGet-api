import { Router } from 'express';

import { FeedbackController } from '../controllers/SubmitFeedbackController';

export const feedbackRouter = Router();

const feedbackController = new FeedbackController();

feedbackRouter.post('/', feedbackController.create);
