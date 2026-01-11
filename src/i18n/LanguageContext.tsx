'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LanguageContextType, DictionaryMessages } from './LanguageTypes';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const dictionaries = React.useMemo(() => ({
    es: () => import('./dictionaries/es.json').then(module => module.default || module),
    en: () => import('./dictionaries/en.json').then(module => module.default || module),
  }), []);

  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'es';
    }
    return 'es';
  });

  const [dictionary, setDictionary] = useState<DictionaryMessages | null>(null);
  
  useEffect(() => {
    const loadDict = async () => {
      try {
        const loadFn = dictionaries[language as keyof typeof dictionaries];
        if (loadFn) {
          const dict = await loadFn();
          setDictionary(dict);
        } else {
          // Fallback a español
          const fallbackDict = await dictionaries.es();
          setDictionary(fallbackDict);
        }
      } catch (error) {
        console.error(`Error loading dictionary for locale: ${language}`, error);
        // Fallback a español
        const fallbackDict = await dictionaries.es();
        setDictionary(fallbackDict);
      }
    };
    
    loadDict();
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    if (!dictionary) return key; // Si el diccionario aún no está cargado, devolver la clave
    
    const keys = key.split('.');
    let translation: string | DictionaryMessages = dictionary;
    
    for (const k of keys) {
      if (typeof translation === 'object' && translation !== null && k in translation) {
        translation = (translation as DictionaryMessages)[k];
      } else {
        return key; // Si la clave no existe en la ruta, devolver la clave original
      }
    }
    
    return typeof translation === 'string' ? translation : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};