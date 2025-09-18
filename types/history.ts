import { HttpMethods } from './restClient';

export interface RequestHistory {
  userId: string;
  endpoint: string;
  requestDuration?: string;
  requestMethod: HttpMethods;
  requestHeaders: string;
  requestBody: string;
  requestSize: string;
  requestTimestamp: number;
  responseSize: string;
  responseStatus: number;
  errorDetails: string;
}
