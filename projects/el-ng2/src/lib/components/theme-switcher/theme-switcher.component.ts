import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CAP_DEFAULT_THEME_TOKEN, CAP_THEMES_TOKEN, CapThemes } from '../../constants';

// export abstract class CapStyleDynamicImport {
//   protected constructor(
//     private readonly documentRef: Document,
//     private readonly style?: string,
//   ) {
//     Array.from(this.documentRef.head.querySelectorAll('style')).forEach((s: HTMLStyleElement) => {
//       console.log(s.outerHTML);
//     });
//   }
// }

@Component({
  selector: 'el-theme-switcher',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnChanges {
  @Input()
  public theme: CapThemes | number = this.defaultTheme;
  @Input()
  public themedWrapperSelector: string = 'body';
  @Input()
  public transition: number = 700;
  private currentTheme: CapThemes | number;


  private get wrapperElement(): HTMLElement {
    return this.document.querySelector(this.themedWrapperSelector);
  }

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(CAP_THEMES_TOKEN) private readonly themes: Map<CapThemes | number, string>,
    @Inject(CAP_DEFAULT_THEME_TOKEN) private readonly defaultTheme: CapThemes | number,
  ) {
    // super(document);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.theme.currentValue != null && changes.theme.currentValue !== this.currentTheme) {
      const currentThemeClass: string = this.getThemeClass(this.theme);
      if (currentThemeClass) {
        this.addTransition();
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

  private addTransition(): void {
    this.wrapperElement.style.transition = `${ this.transition }ms !important`;
    setTimeout(() => {
      this.wrapperElement.style.transition = null;
    }, this.transition);
  }

}
