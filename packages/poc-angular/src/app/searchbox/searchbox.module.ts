import {NgModule, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchboxComponent} from './searchbox.component';
import {CoveoModule, CoveoComponent} from '../coveomodule';
import {SearchboxSuggestionsComponent} from './searchboxsuggestions.component';

@NgModule({
  declarations: [SearchboxComponent, SearchboxSuggestionsComponent],
  imports: [CommonModule],
  exports: [SearchboxComponent],
})
export class SearchboxModule extends CoveoModule {
  constructor(injector: Injector) {
    super(injector);
  }

  protected getComponents(): CoveoComponent[] {
    return [SearchboxComponent];
  }
}
