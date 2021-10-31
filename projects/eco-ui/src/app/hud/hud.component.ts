import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'eco-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
