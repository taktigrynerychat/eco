import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'td[capTd]',
  templateUrl: './cap-td.component.html',
  styleUrls: ['./cap-td.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CapTdComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
