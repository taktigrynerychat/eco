import { Component } from '@angular/core';

@Component({
  selector: 'eco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'eco-ui';

  changeTheme(e: any): void {
    e.target.checked
      ? document.body.setAttribute('cap-theme', 'dark')
      : document.body.removeAttribute('cap-theme');
  }
}
