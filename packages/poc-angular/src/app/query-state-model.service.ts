import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryStateModelService {
  public get expression() {
    return this.urlParameters.get('q');
  }

  public set expression(expression: string) {
    window.location.href = `?q=${expression}`;
  }

  private get urlParameters() {
    return new URLSearchParams(window.location.search);
  }

  constructor() { }
}
