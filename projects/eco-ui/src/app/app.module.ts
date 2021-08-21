import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CapThemeSwitcherModule } from '@cap-ng2/core/components/theme-switcher';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CapThemeSwitcherModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
