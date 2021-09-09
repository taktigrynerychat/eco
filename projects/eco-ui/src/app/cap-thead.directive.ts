import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, forwardRef, HostBinding, QueryList } from '@angular/core';
import { CapThComponent } from '@eco-ui/src/app/cap-th/cap-th.component';

@Directive({
  selector: 'thead[capThead]',
})
export class CapTheadDirective {
  @HostBinding('class.cap-thead')
  public hostClass: boolean = true;
}
