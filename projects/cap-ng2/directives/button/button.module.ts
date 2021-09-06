import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapButtonDirective } from './button.directive';



@NgModule({
  declarations: [
    CapButtonDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [CapButtonDirective],
})
export class CapButtonModule { }
