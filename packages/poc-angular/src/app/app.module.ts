import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SearchboxModule } from './searchbox/searchbox.module';

@NgModule({
  imports: [
    BrowserModule,
    SearchboxModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  ngDoBootstrap() {}
}
