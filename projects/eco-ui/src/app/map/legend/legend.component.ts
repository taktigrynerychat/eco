import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MapService} from '@eco-ui/src/app/services/map.service';

@Component({
	selector: 'eco-legend',
	templateUrl: './legend.component.html',
	styleUrls: ['./legend.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent implements OnInit {
	showLessCount: number = 5;
	showMore: boolean = false;
	showCount: number = this.showLessCount;

	constructor(public mapService: MapService) {
	}

	ngOnInit(): void {}

}
