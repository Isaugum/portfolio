type LanguageCode = 'en' | 'sl';

const STORAGE_KEY = 'site:lang';

const NAV_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  sl: {
    about: 'O meni',
    skills: 'Veščine',
    projects: 'Projekti',
    contact: 'Kontakt',
  },
};

export const getLanguage = (): LanguageCode => {
  const stored = (typeof window !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY)) as LanguageCode | null;
  if (stored === 'en' || stored === 'sl') return stored;
  const browser =
    (typeof navigator !== 'undefined' && navigator.language.slice(0, 2)) ||
    'en';
  return browser === 'sl' ? 'sl' : 'en';
};

export const setLanguage = (lang: LanguageCode): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang);
  }
};

export const translateNav = (key: string): string => {
  const lang = getLanguage();
  return NAV_TRANSLATIONS[lang][key] || key;
};

export const applyHtmlLang = (): void => {
  const lang = getLanguage();
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lang);
  }
};
