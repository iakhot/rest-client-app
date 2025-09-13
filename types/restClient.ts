export const httpMethodsValues = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
] as const;
export type HttpMethods = (typeof httpMethodsValues)[number];

export interface RestRequest {
  url: string;
  method: HttpMethods;
  body?: string;
  headers?: { [key: string]: string };
  size?: number;
}

export interface RestResponse {
  body?: string;
  status?: number;
  statusText?: string;
  size?: string;
  duration?: string;
}
