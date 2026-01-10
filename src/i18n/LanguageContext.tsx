'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

// Cargar diccionarios estáticamente
const dictionaries = {
  es: () => import('./dictionaries/es.json').then(module => module.default || module),
  en: () => import('./dictionaries/en.json').then(module => module.default || module),
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'es';
    }
    return 'es';
  });

  const [dictionary, setDictionary] = useState<any>(null);
  
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
    let translation: any = dictionary;
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation || key;
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