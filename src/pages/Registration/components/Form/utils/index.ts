import {forIn, get, padStart, set} from "lodash";
import BookingService from "../../../../../core/services/BookingService";
import {DATA_ELEMENTS} from "../../../../../core/constants/dhis2Element";

export const getEventFormData = async (eventId: string) => {
    try {
        const eventData = await new BookingService()
            .getBookingByEvent(eventId as string);
        let obj = {};
        eventData.dataValues.forEach((x: any) => {
            const key = x.dataElement;
            Object.assign(obj, {[key]: x.value});
        });
        set(obj, "orgUnit", eventData.orgUnit);
        return obj;
    } catch (e) {
        console.error(e);
        return {};
    }
}

const templateFields = [
    DATA_ELEMENTS.firstName,
    DATA_ELEMENTS.lastName,
    DATA_ELEMENTS.passport,
    DATA_ELEMENTS.otherPassport,
    DATA_ELEMENTS.age,
    DATA_ELEMENTS.sex,
    DATA_ELEMENTS.nationality,
    DATA_ELEMENTS.issuingCountry,
    DATA_ELEMENTS.otherIssuingCountry
]

export function getCurrentDate() {
    const date = new Date();
    return `${date.getFullYear()}-${padStart((date.getMonth() + 1).toString(), 2, "0")}-${padStart(date.getDate().toString(), 2, "0")}`;
}

export function getTemplateFormData(formData: any) {
    const templateData = {...formData};

    forIn(templateData, (value, key) => {
        if (!templateFields.includes(key)) {
            delete templateData[key];
        }
    })
    return templateData;
}

export function sanitizeFields(
    fields: { [key: string]: any },
) {
    const sanitizedFields = {...fields};
    const orgUnit = get(fields, "orgUnit");
    delete sanitizedFields["orgUnit"];

    const dataValues = Object.keys(sanitizedFields).map((key) => {
        return {
            dataElement: key,
            value: typeof sanitizedFields[key] === "boolean" ? sanitizedFields[key] || undefined : sanitizedFields[key],
        };
    });

    return {
        orgUnit,
        dataValues,
    };
}

export function translateDisplayName(selectedLocale: string, displayName: string, metadata: any): string {
    const locale = metadata?.translations?.find((x: any) => x.locale === selectedLocale);
    if (!locale) return displayName;
    return locale.value ?? displayName;
}

export function translateOptionSet(selectedLocale: string, optionSet: any) {
    if (!optionSet) return optionSet;

    const translatedOptions = optionSet?.options?.map((option: any) => {
        const {translations} = option ?? {};

        if (!translations) return option;

        const locale = translations.find((x: any) => x.locale === selectedLocale);
        if (!locale) return option;

        return {
            ...option,
            name: locale.value,
        }
    });

    return {
        ...optionSet,
        options: translatedOptions ?? optionSet?.options
    }
}
