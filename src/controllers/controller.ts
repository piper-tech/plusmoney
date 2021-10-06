import { HttpResponse } from './http-response';

export interface Controller {
  accessToken?: string;
  handler(request: any): Promise<HttpResponse>;
}
