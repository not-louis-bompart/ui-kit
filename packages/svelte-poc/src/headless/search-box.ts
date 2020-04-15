// @ts-ignore
import { response } from './store.ts';

export interface IHeadlessSearchboxOptions {
  searchAsYouType: boolean;
}

export class HeadlessSearchbox {
  private query = '';
  private options: IHeadlessSearchboxOptions = {
    searchAsYouType: false
  }

  constructor(options: Partial<IHeadlessSearchboxOptions> = {}) {
    this.options = { ...this.options, ...options };
  }
  
  public get text() {
    return this.query;
  }

  public set text(value: string) {
    this.query = value;
    this.options.searchAsYouType && this.search();
  }

  public async search() {
    const res = await this.sendRequest();
    response.set(res.results);
  }

  private async sendRequest() {
    const url = 'https://platform.cloud.coveo.com/rest/search/v2?organizationId=searchuisamples&viewAllContent=1';
    const options: RequestInit = {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: this.encodeAsUrlForm({ q: this.query })
    }
    
    const response = await fetch(url, options);
    return await response.json();
  }

  private get headers() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer xx564559b1-0045-48e1-953c-3addd1ee4457');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset="UTF-8"');
    return headers;
  }

  private encodeAsUrlForm(obj: Record<string, string>) {
    return Object.keys(obj).map(k => this.encodeKeyValue(k, obj[k])).join('&');
  }
  
  private encodeKeyValue(key: string, value: string) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }
}