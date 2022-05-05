import {get, set} from "lodash";
import BookingService from "../../../../../core/services/BookingService";

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
