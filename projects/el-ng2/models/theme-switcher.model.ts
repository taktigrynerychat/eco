import { CapThemes } from '@el-ng2/core/constants';

export interface ThemeSwitcherConfig {
  defaultTheme?: CapThemes | number;
  themesMap: Map<CapThemes | number, string>;
}
