import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchboxModule } from './searchbox/searchbox.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SearchboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
