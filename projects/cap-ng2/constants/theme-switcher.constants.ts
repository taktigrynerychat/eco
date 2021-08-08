import { InjectionToken } from '@angular/core';

export enum CapThemes {
  light,
  dark
}

export const CAP_THEMES_MAP: Map<number, string> = new Map<number, string>([
  [CapThemes.light, 'light'],
  [CapThemes.dark, 'dark'],
]);

export const CAP_THEMES_TOKEN: InjectionToken<Record<number, string>> =
  new InjectionToken<Record<number, string>>('CAP_THEMES_TOKEN');

export const CAP_DEFAULT_THEME_TOKEN: InjectionToken<CapThemes | number> =
  new InjectionToken<CapThemes | number>('CAP_DEFAULT_THEME');
