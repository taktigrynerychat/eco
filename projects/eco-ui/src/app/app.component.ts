import { Component } from '@angular/core';
import { CapThemes } from '@cap-ng2/core/constants';

@Component({
  selector: 'eco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'eco-ui';
  capThemes: typeof CapThemes = CapThemes;
  currentTheme: CapThemes;
}
