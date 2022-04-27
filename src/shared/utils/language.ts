import moment from "moment"
import i18n from '@dhis2/d2-i18n'

export function isLangRTL(code: string) {
    const langs = ['ar', 'fa', 'ur']
    const prefixed = langs.map(c => `${c}-`)
    return (
        langs.includes(code) ||
        prefixed.filter(c => code.startsWith(c)).length > 0
    )
}

export function changeLocale(locale: string) {

    // moment.locale(locale)
    i18n.changeLanguage(simplifyLocale(locale))
    document.documentElement.setAttribute(
        'dir',
        isLangRTL(locale) ? 'rtl' : 'ltr'
    )
}


const simplifyLocale = (locale: string) => {
    const idx = locale.indexOf('-')
    if (idx === -1) {
        return locale
    }
    return locale.substr(0, idx)
}
