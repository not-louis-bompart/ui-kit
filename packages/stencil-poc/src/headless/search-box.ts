import {headlessEngine} from '../headless/store';

export interface HeadlessSearchboxOptions {
  searchAsYouType: boolean;
}

export class HeadlessSearchbox {
  private query = '';
  private options: HeadlessSearchboxOptions = {
    searchAsYouType: false,
  };

  constructor(options: Partial<HeadlessSearchboxOptions> = {}) {
    this.options = {...this.options, ...options};
  }

  public get text() {
    return this.query;
  }

  public set text(value: string) {
    this.query = value;
    headlessEngine.updateQueryExpression(value);
    this.options.searchAsYouType && this.search();
  }

  public search() {
    headlessEngine.performSearch();
  }
}
