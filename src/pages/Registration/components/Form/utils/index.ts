import {forIn, get, set} from "lodash";
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
            value: sanitizedFields[key],
        };
    });

    return {
        orgUnit,
        dataValues,
    };
}
