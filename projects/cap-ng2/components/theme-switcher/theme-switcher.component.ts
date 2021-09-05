import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CAP_DEFAULT_THEME_TOKEN, CAP_THEMES_TOKEN, CapThemes } from '@cap-ng2/core/constants';

@Component({
  selector: 'cap-theme-switcher',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapThemeSwitcherComponent implements OnChanges {
  @Input()
  public theme: CapThemes | number = this.defaultTheme;
  @Input()
  public themedWrapperSelector: string = 'body';

  private currentTheme: CapThemes | number;

  private get wrapperElement(): HTMLElement {
    return this.document.querySelector(this.themedWrapperSelector);
  }

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(CAP_THEMES_TOKEN) private readonly themes: Map<CapThemes | number, string>,
    @Inject(CAP_DEFAULT_THEME_TOKEN) private readonly defaultTheme: CapThemes | number,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.theme.currentValue != null && changes.theme.currentValue !== this.currentTheme) {
      const currentThemeClass: string = this.getThemeClass(this.theme);
      if (currentThemeClass) {
        this.wrapperElement.setAttribute('data-cap-theme', currentThemeClass);
        this.currentTheme = this.theme;
      } else {
        console.warn(`There is no theme with ID:${ this.theme } in provided themes map`);
      }
    }
  }

  private getThemeClass(theme: CapThemes): string {
    return this.themes.get(theme);
  }

}
