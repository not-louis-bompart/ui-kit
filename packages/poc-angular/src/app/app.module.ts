import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SearchboxModule } from './searchbox/searchbox.module';
import { ResultListModule } from './resultlist/resultlist.module';

@NgModule({
  imports: [
    BrowserModule,
    SearchboxModule,
    ResultListModule
  ],
  providers: [],
  bootstrap: [],
  declarations: []
})
export class AppModule {
  ngDoBootstrap() {}
}
