import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CapThemeSwitcherModule } from '@cap-ng2/core/components/theme-switcher';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { CapTableDirective } from './cap-table.directive';
import { CapRowDirective } from './cap-row.directive';
import { CapTbodyComponent } from './cap-tbody/cap-tbody.component';
import { CapThComponent } from './cap-th/cap-th.component';
import { CapTheadDirective } from './cap-thead.directive';
import { CapTrComponent } from './cap-tr/cap-tr.component';
import { CapCellDirective } from './cap-cell.directive';
import { CapTdComponent } from './cap-td/cap-td.component';
import { CapMapperPipe } from './cap-mapper.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CapTableDirective,
    CapRowDirective,
    CapTbodyComponent,
    CapThComponent,
    CapTheadDirective,
    CapTrComponent,
    CapCellDirective,
    CapTdComponent,
    CapMapperPipe,
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
