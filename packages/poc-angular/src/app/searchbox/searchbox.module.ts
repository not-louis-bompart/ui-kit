import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchboxComponent } from './searchbox.component';
import { CoveoModule, CoveoComponent } from '../coveomodule';



@NgModule({
  declarations: [SearchboxComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchboxComponent]
})
export class SearchboxModule extends CoveoModule {
  constructor(injector: Injector) {
    super(injector);
  }

  protected getComponents(): CoveoComponent[] {
    return [
      SearchboxComponent
    ];
  }
}
