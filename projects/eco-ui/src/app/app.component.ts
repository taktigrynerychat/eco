import {CapThemes} from '@cap-ng2/core/constants';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'eco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
	title: string = 'eco-ui';
	capThemes: typeof CapThemes = CapThemes;
	currentTheme: CapThemes;

}
