import { createContext, useContext, useState, useEffect } from 'react';

const LocaleContext = createContext({ locale: 'ko', setLocale: (l: string) => {} });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('ko');
  
  useEffect(() => {
    const saved = localStorage.getItem('locale') || 'ko';
    setLocale(saved);
  }, []);
  
  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
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
    import(`../locales/${locale}/${namespace}.json`)
      .then(m => setMessages(m.default))
      .catch(() => import(`../locales/ko/${namespace}.json`).then(m => setMessages(m.default)));
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
