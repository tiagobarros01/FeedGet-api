import { SubmitFeedbackService } from './SubmitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  {
    create: createFeedbackSpy,
  },
  {
    sendMail: sendMailSpy,
  }
);

describe('business rule', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: 'Test comment',
        screenshot: 'data:image/png;base64/teste',
      })
    ).resolves.not.toThrowError();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedbackService.execute({
        type: '',
        comment: 'Test comment',
        screenshot: 'data:image/png;base64/teste',
      })
    ).rejects.toEqual(new Error('Type is required'));

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64/teste',
      })
    ).rejects.toEqual(new Error('Comment is required'));

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: 'Test comment',
        screenshot: 'images-test.png',
      })
    ).rejects.toEqual(new Error('Invalid screenshot format'));

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });
});
