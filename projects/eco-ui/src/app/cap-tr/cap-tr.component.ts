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
export class CapTrComponent<T> implements OnInit {
  @ContentChildren(forwardRef(() => CapCellDirective))
  private readonly cells: QueryList<CapCellDirective> = new QueryList<CapCellDirective>();

  public cells$: Observable<Readonly<Record<string, CapCellDirective>>>;
  public item$: Observable<Readonly<T>>;

  constructor(
    @Inject(forwardRef(() => CapTableDirective))
    public readonly table: CapTableDirective<T>,
    @Inject(forwardRef(() => CapTbodyComponent))
    public readonly tbody: CapTbodyComponent<T>,
  ) {
  }

  public ngOnInit(): void {
    this.cells$ = this.cells.changes.pipe(
      startWith(null),
      map(() =>
        this.cells.reduce<Record<string, CapCellDirective>>(
          (record: Record<string, CapCellDirective>, item: CapCellDirective) => ({...record, [item.capCell]: item}),
          {},
        ),
      ),
    );

    this.item$ = this.tbody.rows.changes.pipe(
      startWith(null),
      map(
        () =>
          this.tbody.data[this.tbody.rows.toArray().findIndex((row: CapTrComponent<T>) => row === this)],
      ),
    );
  }
}
