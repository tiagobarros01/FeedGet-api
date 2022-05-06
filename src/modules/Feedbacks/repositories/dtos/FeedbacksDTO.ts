export const FeedbackTypes = ['BUG', 'IDEA', 'OTHER'] as const;
export type FeedbackType = typeof FeedbackTypes[number];

export interface CreateFeedbacksDTO {
  type: FeedbackType;
  comment: string;
  screenshot?: string;
}
