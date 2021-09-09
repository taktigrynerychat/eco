import { AfterViewInit, ChangeDetectorRef, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'table[capTable]',
})
export class CapTableDirective<T> implements AfterViewInit {
  @Input()
  public columns: ReadonlyArray<string> = [];

  @HostBinding('class.cap-table')
  public hostClass: boolean = true;

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
