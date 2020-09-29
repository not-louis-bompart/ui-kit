import fetch from 'cross-fetch';
export type HttpMethods = 'POST' | 'GET' | 'DELETE' | 'PUT';
export type HTTPContentTypes = 'application/json' | 'text/html';
import {backOff} from 'exponential-backoff';
import {SearchAPIErrorWithStatusCode} from './search/search-api-error-response';

export interface PlatformClientCallOptions<RequestParams> {
  url: string;
  method: HttpMethods;
  contentType: HTTPContentTypes;
  requestParams: RequestParams;
  accessToken: string;
  renewAccessToken: () => Promise<string>;
}

export interface PlatformResponse<T> {
  body: T;
  response: Response;
}

export class PlatformClient {
  static async call<RequestParams, ResponseType>(
    options: PlatformClientCallOptions<RequestParams>
  ): Promise<PlatformResponse<ResponseType>> {
    const request = () =>
      fetch(options.url, {
        method: options.method,
        headers: {
          'Content-Type': options.contentType,
          Authorization: `Bearer ${options.accessToken}`,
        },
        body: JSON.stringify(options.requestParams),
      });
    let response = await request();
    if (response.status === 419) {
      const accessToken = await options.renewAccessToken();

      if (accessToken !== '') {
        return PlatformClient.call({...options, accessToken});
      }
    }

    if (response.status === 429) {
      response = await PlatformClient.throttleBackOff(request);
    }
    return {
      response,
      body: (await response.json()) as ResponseType,
    };
  }

  static async throttleBackOff(
    request: () => Promise<Response>
  ): Promise<Response> {
    const options = {
      retry: (e: SearchAPIErrorWithStatusCode) => {
        return e && e.statusCode === 429;
      },
    };
    return await backOff(request, options);
  }
}

type PlatformCombination =
  | {env: 'dev'; region: 'us-east-1' | 'eu-west-1' | 'eu-west-3'}
  | {env: 'qa'; region: 'us-east-1' | 'eu-west-1' | 'ap-southeast-2'}
  | {env: 'hipaa'; region: 'us-east-1'}
  | {env: 'prod'; region: 'us-east-1' | 'us-west-2' | 'eu-west-1'};

type PlatformEnvironment = PlatformCombination['env'];

export function platformUrl<E extends PlatformEnvironment = 'prod'>(options?: {
  environment?: E;
  region?: Extract<PlatformCombination, {env: E}>['region'];
}) {
  const urlEnv =
    !options || !options.environment || options.environment === 'prod'
      ? ''
      : options.environment;
  const urlRegion =
    !options || !options.region || options.region === 'us-east-1'
      ? ''
      : `-${options.region}`;

  return `https://platform${urlEnv}${urlRegion}.cloud.coveo.com`;
}
