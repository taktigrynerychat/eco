import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, forwardRef, HostBinding, QueryList } from '@angular/core';
import { CapThComponent } from '@eco-ui/src/app/cap-th/cap-th.component';

@Directive({
  selector: 'thead[capThead]',
})
export class CapTheadDirective implements AfterContentInit {

  @HostBinding('class.cap-thead')
  public hostClass: boolean = true;

  @ContentChildren(forwardRef(() => CapThComponent), {descendants: true})
  public thList?: QueryList<CapThComponent>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  public ngAfterContentInit(): void {
    if (this.thList?.last && this.thList.last.resizable) {
      this.thList.last.resizable = false;
      this.cdr.detectChanges();
    }
  }

}
