import http from "http";

export type ResponseFromControllerType<T> = {
  raw: {
    res: http.ServerResponse;
    req: http.IncomingMessage;
  };
  rawPayload: Buffer;
  headers: http.OutgoingHttpHeaders;
  statusCode: number;
  statusMessage: string;
  trailers: { [key: string]: string };
  payload: string;
  body: T;
  json: <T = any>() => T;
  cookies: Array<object>;
};
