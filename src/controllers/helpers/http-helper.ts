import { HttpResponse, HttpResponseError } from '@/controllers';
import { ServerError, BadRequest, Unauthorized } from '@/controllers/errors';

export class HttpHelper {
  static ok(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data
    };
  }

  static created(data: any): HttpResponse {
    return {
      statusCode: 201,
      body: data
    };
  }

  static badRequest(error: Error): HttpResponseError {
    return {
      statusCode: 400,
      body: new BadRequest(error.message)
    };
  }

  static notFound(error: Error): HttpResponseError {
    return {
      statusCode: 404,
      body: new BadRequest(error.message)
    };
  }

  static unauthorized(error: Error): HttpResponseError {
    return {
      statusCode: 401,
      body: new Unauthorized(error.message)
    };
  }

  static serverError(): HttpResponseError {
    return {
      statusCode: 500,
      body: new ServerError()
    };
  }
}
