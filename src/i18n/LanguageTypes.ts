export type DictionaryMessages = {
  [key: string]: string | DictionaryMessages;
};

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}
