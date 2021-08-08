import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CAP_DEFAULT_THEME_TOKEN, CAP_THEMES_MAP, CAP_THEMES_TOKEN, CapThemes } from '@cap-ng2/core/constants';
import { ThemeSwitcherConfig } from '@cap-ng2/core/models';
import { CapThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
  declarations: [
    CapThemeSwitcherComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CapThemeSwitcherComponent,
  ],
  providers: [
    {
      provide: CAP_THEMES_TOKEN,
      useValue: CAP_THEMES_MAP,
    },
    {
      provide: CAP_DEFAULT_THEME_TOKEN,
      useValue: CapThemes.light,
    },
  ],
})
export class CapThemeSwitcherModule {
  public static forRoot(themeSwitcherConfig: ThemeSwitcherConfig): ModuleWithProviders<CapThemeSwitcherModule> {
    return {
      ngModule: this,
      providers: [
        {
          provide: CAP_THEMES_TOKEN,
          useValue: themeSwitcherConfig.themesMap,
        },
        {
          provide: CAP_DEFAULT_THEME_TOKEN,
          useValue: themeSwitcherConfig.defaultTheme ?? themeSwitcherConfig.themesMap.values().next().value,
        },
      ],
    };
  }
}
