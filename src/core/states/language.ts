import { atom } from "recoil";
import { changeLocale } from "../../shared/utils/language";
import { defaultLanguage } from "../constants/languages";

export const LocaleState = atom<string>({
  key: "languageState",
  default: defaultLanguage,
  effects: [
    ({ setSelf, trigger, onSet }) => {
      if (trigger === "get") {
        setSelf(localStorage.getItem("locale") ?? defaultLanguage);
        changeLocale(localStorage.getItem("locale") ?? defaultLanguage);
      }

      onSet((newValue) => {
        changeLocale(newValue ?? defaultLanguage);
        localStorage.setItem("locale", newValue ?? defaultLanguage);
      });
    },
  ],
});
