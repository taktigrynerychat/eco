import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, skip, tap } from 'rxjs/operators';
import { CAP_DEFAULT_THEME_TOKEN, CAP_THEMES_TOKEN, CapThemes } from '@cap-ng2/core/constants';
import { untilDestroyed } from '@cap-ng2/core/operators';

@Component({
  selector: 'cap-theme-switcher',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapThemeSwitcherComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  public theme: CapThemes | number = this.defaultTheme;
  @Input()
  public themedWrapperSelector: string = 'body';
  @Input()
  public transition: number = 0;

  private currentTheme: CapThemes | number;
  private themeChange$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


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
        this.transition && this.themeChange$.next(true);
        this.wrapperElement.setAttribute('data-cap-theme', currentThemeClass);
        this.currentTheme = this.theme;
      } else {
        console.warn(`There is no theme with ID:${ this.theme } in provided themes map`);
      }
    }
  }

  public ngOnInit(): void {
    this.transition && this.addTransition();
  }

  // for untilDestroyed
  public ngOnDestroy(): void {
  }

  private getThemeClass(theme: CapThemes): string {
    return this.themes.get(theme);
  }

  private addTransition(): void {
    this.themeChange$
      .pipe(
        untilDestroyed(this),
        filter((hasChanged: boolean) => !!hasChanged),
        skip(1),
        tap(() => {
          this.wrapperElement.style.transition = `${ this.transition }ms`;
        }),
        debounceTime(this.transition),
      )
      .subscribe(() => {
        this.wrapperElement.style.transition = null;
      });
  }

}
