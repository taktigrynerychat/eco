import { CapThemes } from '../constants';

export interface ThemeSwitcherConfig {
  defaultTheme?: CapThemes | number;
  themesMap: Map<CapThemes | number, string>;
}
