// src/components/LanguageSwitcher.tsx
'use client';

import { useLanguage } from '@/i18n/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="border border-gray-600 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
};

export default LanguageSwitcher;