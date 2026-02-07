import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const translations: any = {
  ko: {"meta":{"siteName":"추억과 낭만월드","tagline":"AI가 추억을 보관합니다"},"nav":{"home":"홈","minihome":"미니홈피","diary":"다이어리","photo":"사진첩","club":"클럽","guest":"추억","jukebox":"상점"},"buttons":{"submit":"제출"},"home":{"greeting":"좋은 하루예요","friendsActivity":"일촌들의 실시간 소식","viewAll":"전체보기"}},
  en: {"meta":{"siteName":"Memory & Romance World","tagline":"AI preserves your memories"},"nav":{"home":"Home","minihome":"Mini Homepage","diary":"Diary","photo":"Photos","club":"Club","guest":"Memories","jukebox":"Store"},"buttons":{"submit":"Submit"},"home":{"greeting":"Good day","friendsActivity":"Friends Real-time Activity","viewAll":"View All"}},
  zh: {"meta":{"siteName":"回忆与浪漫世界","tagline":"AI保存您的回忆"},"nav":{"home":"主页","minihome":"迷你主页","diary":"日记","photo":"相册","club":"俱乐部","guest":"回忆","jukebox":"商店"},"buttons":{"submit":"提交"},"home":{"greeting":"美好的一天","friendsActivity":"好友实时动态","viewAll":"查看全部"}},
  ja: {"meta":{"siteName":"思い出とロマンスの世界","tagline":"AIがあなたの思い出を保存"},"nav":{"home":"ホーム","minihome":"ミニホームページ","diary":"日記","photo":"写真","club":"クラブ","guest":"思い出","jukebox":"ストア"},"buttons":{"submit":"送信"},"home":{"greeting":"良い一日を","friendsActivity":"友達のリアルタイム活動","viewAll":"すべて表示"}},
  hi: {"meta":{"siteName":"यादें और रोमांस की दुनिया","tagline":"AI"},"nav":{"home":"होम","minihome":"मिनी","diary":"डायरी","photo":"फोटो","club":"क्लब","guest":"यादें","jukebox":"स्टोर"},"buttons":{"submit":"OK"},"home":{"greeting":"शुभ दिन","friendsActivity":"गतिविधि","viewAll":"सभी"}},
  es: {"meta":{"siteName":"Mundo de Recuerdos","tagline":"AI"},"nav":{"home":"Inicio","minihome":"Mini","diary":"Diario","photo":"Fotos","club":"Club","guest":"Recuerdos","jukebox":"Tienda"},"buttons":{"submit":"OK"},"home":{"greeting":"Buen día","friendsActivity":"Actividad","viewAll":"Todo"}},
  fr: {"meta":{"siteName":"Monde des Souvenirs","tagline":"AI"},"nav":{"home":"Accueil","minihome":"Mini","diary":"Journal","photo":"Photos","club":"Club","guest":"Souvenirs","jukebox":"Boutique"},"buttons":{"submit":"OK"},"home":{"greeting":"Bonne journée","friendsActivity":"Activité","viewAll":"Tout"}},
  ar: {"meta":{"siteName":"عالم الذكريات","tagline":"AI"},"nav":{"home":"الرئيسية","minihome":"مصغرة","diary":"يوميات","photo":"الصور","club":"النادي","guest":"الذكريات","jukebox":"المتجر"},"buttons":{"submit":"OK"},"home":{"greeting":"يوم سعيد","friendsActivity":"نشاط","viewAll":"الكل"}},
  bn: {"meta":{"siteName":"স্মৃতির জগৎ","tagline":"AI"},"nav":{"home":"হোম","minihome":"মিনি","diary":"ডায়েরি","photo":"ছবি","club":"ক্লাব","guest":"স্মৃতি","jukebox":"দোকান"},"buttons":{"submit":"OK"},"home":{"greeting":"শুভ দিন","friendsActivity":"কার্যকলাপ","viewAll":"সব"}},
  pt: {"meta":{"siteName":"Mundo de Memórias","tagline":"AI"},"nav":{"home":"Início","minihome":"Mini","diary":"Diário","photo":"Fotos","club":"Clube","guest":"Memórias","jukebox":"Loja"},"buttons":{"submit":"OK"},"home":{"greeting":"Bom dia","friendsActivity":"Atividade","viewAll":"Tudo"}},
  ru: {"meta":{"siteName":"Мир воспоминаний","tagline":"AI"},"nav":{"home":"Главная","minihome":"Мини","diary":"Дневник","photo":"Фото","club":"Клуб","guest":"Воспоминания","jukebox":"Магазин"},"buttons":{"submit":"OK"},"home":{"greeting":"Добрый день","friendsActivity":"Активность","viewAll":"Все"}},
  id: {"meta":{"siteName":"Dunia Kenangan","tagline":"AI"},"nav":{"home":"Beranda","minihome":"Mini","diary":"Buku Harian","photo":"Foto","club":"Klub","guest":"Kenangan","jukebox":"Toko"},"buttons":{"submit":"OK"},"home":{"greeting":"Selamat siang","friendsActivity":"Aktivitas","viewAll":"Semua"}}
};

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
  const messages = translations[locale] || translations.ko;

  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
}
