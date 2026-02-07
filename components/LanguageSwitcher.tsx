import { useLocale } from '../i18n.tsx';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  
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

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
        <span className="text-xl">{languages.find(l => l.code === locale)?.flag}</span>
        <span className="text-xs font-bold text-white/70">{languages.find(l => l.code === locale)?.code.toUpperCase()}</span>
      </button>
      <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
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
    </div>
  );
}
