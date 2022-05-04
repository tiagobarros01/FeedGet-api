import { CreateFeedbacksDTO } from './dtos/FeedbacksDTO';

export interface FeedbacksRepository {
  create(data: CreateFeedbacksDTO): Promise<void>;
}
