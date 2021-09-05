import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild, ContentChildren,
  forwardRef,
  HostBinding,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CapRowDirective } from '@eco-ui/src/app/cap-row.directive';
import { CapTrComponent } from '@eco-ui/src/app/cap-tr/cap-tr.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tbody[capTbody]',
  templateUrl: './cap-tbody.component.html',
  styleUrls: ['./cap-tbody.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CapTbodyComponent<T> {
  @Input()
  public data: ReadonlyArray<T> = [];

  @ContentChild(forwardRef(() => CapRowDirective))
  public row?: Readonly<CapRowDirective<T>>;

  @ContentChildren(forwardRef(() => CapTrComponent))
  public rows: QueryList<CapTrComponent<T>>;

  @HostBinding('class.cap-tbody')
  public hostClass: boolean = true;

  public itemToContext($implicit: T, index: number): { $implicit: T, index: number } {
    return {$implicit, index};
  }

}
