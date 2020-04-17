import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './resultlist.component';
import { CoveoModule, CoveoComponent } from '../coveomodule';
import { ResultComponent } from './result.component';



@NgModule({
  declarations: [ResultListComponent, ResultComponent],
  imports: [
    CommonModule
  ]
})
export class ResultListModule extends CoveoModule {
  constructor(injector: Injector) {
    super(injector);
  }

  protected getComponents(): CoveoComponent[] {
    return [ResultListComponent, ResultComponent];
  }
}
