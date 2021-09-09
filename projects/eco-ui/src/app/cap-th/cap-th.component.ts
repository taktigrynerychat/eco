import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Optional, QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CapTableDirective } from '@eco-ui/src/app/cap-table.directive';
import { CapTheadDirective } from '@eco-ui/src/app/cap-thead.directive';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[capTh]',
  templateUrl: './cap-th.component.html',
  styleUrls: ['./cap-th.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CapThComponent<T> {

  @HostBinding('class.cap-th')
  public hostClass: boolean = true;

  @Input()
  public set resizable(val: any) {
    this._resizable = coerceBooleanProperty(val);
  };

  public get resizable(): boolean {
    return this._resizable;
  }

  private _resizable: boolean = false;

}

function coerceBooleanProperty(value: any): boolean {
  return value != null && `${ value }` !== 'false';
}
