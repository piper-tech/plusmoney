import { HttpResponse } from '@/controllers';

export interface Middleware {
  handler(request: any): Promise<HttpResponse>
}
