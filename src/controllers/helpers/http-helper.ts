import { HttpResponse, HttpResponseError } from "@/controllers/http-response"
import { ServerError } from "@/controllers/errors/server-error"
import { BadRequest } from "@/controllers/errors/bad-request"

export class HttpHelper {
    static ok(data: any): HttpResponse {
        return {
            statusCode: 200,
            body: data
        }
    }
    static created(data: any): HttpResponse {
        return {
            statusCode: 201,
            body: data
        }
    }
    static badRequest(error: Error): HttpResponseError {
        return {
            statusCode: 400,
            body: new BadRequest(error.message)
        }
    }
    static serverError(reason: string): HttpResponseError {
        return {
            statusCode: 500,
            body: new ServerError(reason)
        }
    }
}