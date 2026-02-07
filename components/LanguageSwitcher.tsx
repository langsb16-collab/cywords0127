import { useLocale } from '../i18n.tsx';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all bg-white/5"
      >
        <span className="text-xl">{currentLang.flag}</span>
        <span className="text-xs font-bold text-white/70">{currentLang.code.toUpperCase()}</span>
        <svg className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] max-h-[400px] overflow-y-auto z-50">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-left transition-all ${
                  locale === lang.code 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
