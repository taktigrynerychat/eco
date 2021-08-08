import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CAP_DEFAULT_THEME_TOKEN, CAP_THEMES_MAP, CAP_THEMES_TOKEN, CapThemes } from '@cap-ng2/core/constants';
import { ThemeSwitcherConfig } from '@cap-ng2/core/models';
import { ThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
  declarations: [
    ThemeSwitcherComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ThemeSwitcherComponent,
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
export class ThemeSwitcherModule {
  public static forRoot(themeSwitcherConfig: ThemeSwitcherConfig): ModuleWithProviders<ThemeSwitcherModule> {
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
