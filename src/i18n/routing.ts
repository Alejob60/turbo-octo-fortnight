// src/i18n/routing.ts
import { locales, defaultLocale } from './config';

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'always', // Opciones: 'always', 'as-needed', 'never'
} as const;

export type Locale = typeof locales[number];