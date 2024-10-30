export type ResponseApi<T> = {
  statusCode: number;
  message: string;
  content: T;
  dateTime: string;
  messageConstants: any;
};