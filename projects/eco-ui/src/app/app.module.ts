import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeSwitcherModule } from '@el-ng2/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ThemeSwitcherModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
