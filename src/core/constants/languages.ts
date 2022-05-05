export interface Language {
  locale: string;
  name: string;
  flag?: string;
}

export const defaultLanguage = "en";

export const LANGUAGES: Language[] = [
  {
    name: "English",
    locale: "en",
    flag: "🇬🇧",
  },
  {
    name: "Español",
    locale: "es",
    flag: "🇪🇸",
  },
  {
    name: "Français",
    locale: "fr",
    flag: "🇫🇷",
  },
  {
    name: "Arabic",
    locale: "ar",
    flag: "🇸🇦",
  },
  {
    name: "Russian",
    locale: "ru",
    flag: "🇷🇺",
  },
  {
    name: "Chinese",
    locale: "zh",
    flag: "🇨🇳",
  },
  {
    name: "Swahili",
    locale: "sw",
    flag: "🇹🇿",
  },
];
