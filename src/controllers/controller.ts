import { HttpResponse } from "./http-response";

export interface Controller {
    handler(request: any): Promise<HttpResponse>;
}