import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocaleContextType {
  locale: string;
  setLocale: (l: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({ locale: 'ko', setLocale: () => {} });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('ko');
  
  useEffect(() => {
    const saved = localStorage.getItem('locale') || 'ko';
    setLocaleState(saved);
  }, []);

  const changeLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    window.location.reload();
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);

export function useTranslations(namespace: string = 'common') {
  const { locale } = useLocale();
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    import(`./locales/${locale}/${namespace}.json`)
      .then(m => setMessages(m.default))
      .catch(() => import(`./locales/ko/${namespace}.json`).then(m => setMessages(m.default)));
  }, [locale, namespace]);

  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
}
