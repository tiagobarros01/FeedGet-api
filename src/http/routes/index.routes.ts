import { Router } from 'express';

import { feedbackRouter } from '~/modules/Feedbacks/http/routes/Feedback.routes';

export const routes = Router();

routes.use('/feedbacks', feedbackRouter);
