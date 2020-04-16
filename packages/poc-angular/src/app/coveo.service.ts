import {Injectable} from '@angular/core';
import {CoveoHeadlessEngine, CoveoHeadlessState} from 'coveo-headless-engine';

@Injectable({
  providedIn: 'root',
})
export class CoveoService {
  private headlessEngine: CoveoHeadlessEngine;

  constructor() {
    this.headlessEngine = new CoveoHeadlessEngine();
  }

  public search(expression: string) {
    this.headlessEngine.updateQueryExpression(expression);
    this.headlessEngine.performSearch();
  }

  public subscribe(onStateChanged: (state: CoveoHeadlessState) => void) {
    this.headlessEngine.reduxStore.subscribe(() => {
      onStateChanged(this.headlessEngine.state);
    });
  }
}
