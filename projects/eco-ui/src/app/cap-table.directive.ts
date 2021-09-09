import { AfterViewInit, ChangeDetectorRef, ContentChildren, Directive, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { CapThComponent } from '@eco-ui/src/app/cap-th/cap-th.component';

@Directive({
  selector: 'table[capTable]',
})
export class CapTableDirective<T> implements AfterViewInit {
  @Input()
  public columns: ReadonlyArray<string> = [];

  @HostBinding('class.cap-table')
  public hostClass: boolean = true;

  @ContentChildren(forwardRef(() => CapThComponent), {descendants: true})
  public thList?: QueryList<CapThComponent<T>>;

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
