import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'table[capTable]',
})
export class CapTableDirective<T> {
  @Input()
  columns: ReadonlyArray<keyof T | string> = [];

  @HostBinding('class.cap-table')
  public hostClass: boolean = true;

}
