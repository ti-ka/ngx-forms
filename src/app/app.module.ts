import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxFormsCoreModule } from 'projects/ngx-forms-core/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxFormsCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
