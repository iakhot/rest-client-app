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
  headers?: Record<string, string>;
  size?: number;
}

export interface RestResponse {
  body?: string;
  status?: number;
  statusText?: string;
  size?: string;
  duration?: string;
}

export interface KeyValueProps {
  uuid: string;
  key: string;
  value: string;
  selected?: boolean;
}

export type KeyValuePair = Pick<KeyValueProps, 'key' | 'value'>;
