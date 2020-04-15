import { Injector, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';

export const elementPrefix = 'coveo';

export type CoveoComponent = Type<any> & { tagname: string };

export abstract class CoveoModule {
  constructor(private injector: Injector) {
    this.getComponents().forEach(component => {
      customElements.define(
        `${elementPrefix}-${component.tagname}`,
        createCustomElement(component, { injector: this.injector })
      );
    });
  }

  protected abstract getComponents(): CoveoComponent[];

  ngDoBootstrap() {}
}
