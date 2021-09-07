export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpResponseError {
  statusCode: number;
  body: {
      message: string;
  };
}
