import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'eco-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {
  public data: any[] = [
    {
      id: 1,
      name: 'Vlad',
      surname: 'Rusakov',
    },
    {
      id: 2,
      name: 'Vlad',
      surname: 'Rusakov',
    },
    {
      id: 3,
      name: 'Vlad',
      surname: 'Rusakov',
    },
  ];

  public columns: string[] = ['id', 'name', 'surname', 'london'];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  changeColumns(): void {
    this.columns = ['id', 'name'];
    this.cdr.detectChanges();
  }

}
