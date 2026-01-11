// src/i18n/config.ts


export const locales = ['es', 'en'];
export const defaultLocale = 'es';

export type Locale = typeof locales[number];

export const localeNames = {
  es: 'Español',
  en: 'English',
};

export async function getDictionary(locale: Locale) {
  try {
    const dict = await import(`./dictionaries/${locale}.json`);
    return dict.default;
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback to Spanish if the requested locale is not available
    const fallbackDict = await import('./dictionaries/es.json');
    return fallbackDict.default;
  }
}