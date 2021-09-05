import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  Inject,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CapCellDirective } from '@eco-ui/src/app/cap-cell.directive';
import { CapTableDirective } from '@eco-ui/src/app/cap-table.directive';
import { CapTbodyComponent } from '@eco-ui/src/app/cap-tbody/cap-tbody.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[capTr]',
  templateUrl: './cap-tr.component.html',
  styleUrls: ['./cap-tr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CapTrComponent<T> {
}
