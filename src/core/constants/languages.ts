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
    name: "عربي",
    locale: "ar",
    flag: "🇸🇦",
  },
  {
    name: "Русский",
    locale: "ru",
    flag: "🇷🇺",
  },
  // { //TODO: Uncomment this when the chinese translation is ready
  //   name: "中国人",
  //   locale: "zh",
  //   flag: "🇨🇳",
  // },
  {
    name: "Swahili",
    locale: "sw",
    flag: "🇹🇿",
  },
];
