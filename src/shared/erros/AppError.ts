interface AppErrorProps {
  message: string;
  statusCode?: number;
  messageCode?: string;
}

export class AppError {
  public readonly message: string;

  public readonly messageCode: string;

  public readonly statusCode: number;

  constructor();

  constructor(props: AppErrorProps);

  constructor(...args: any[]) {
    this.message = 'Generic error.';
    this.statusCode = 400;
    this.messageCode = 'generic.error';

    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        const [message] = args;
        this.message = message;
      }

      if (args[0].message) {
        const [props] = args as AppErrorProps[];

        this.message = props.message;
        if (props.messageCode) this.messageCode = props.messageCode;
        if (props.statusCode) this.statusCode = props.statusCode;
      }
    }

    if (args.length > 1) {
      const [message, statusCode, messageCode] = args;

      this.message = message;
      if (messageCode) this.messageCode = messageCode;
      if (statusCode) this.statusCode = statusCode;
    }
  }
}
