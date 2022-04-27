import {atom} from "recoil";
import {changeLocale} from "../../shared/utils/language";

export const LocaleState = atom<string>({
    key: "languageState",
    default: "en",
    effects: [
        ({setSelf, trigger, onSet}) => {
            if (trigger === "get") {
                setSelf(localStorage.getItem("locale") ?? "en");
            }

            onSet((newValue,) => {
                changeLocale(newValue ?? "en");
                localStorage.setItem("locale", newValue ?? "en");
            })

        }
    ]
})
