import {BookingEvent, DataValue} from "../../../../../core/interface/events";
import {METADATA} from "../../../../../core/constants";
import BookingService from "../../../../../core/services/BookingService";

function generatePayload(dataValues: DataValue[], event?: string): BookingEvent {
    return {
        program: METADATA.PROGRAM,
        programStage: METADATA.PROGRAM_STAGE,
        orgUnit: "ychsfCBrH6U",
        status: "ACTIVE",
        orgUnitName: "Juba Int Airport",
        attributeCategoryOptions: METADATA.ATTRIBUTE_CATEGORY_OPTION,
        attributeOptionCombo: METADATA.ATTRIBUTE_OPTION_COMBO,
        eventDate: new Date().toISOString(),
        event: event ?? "",
        dataValues,
    }
}

function showMessage(message: string, type: string, {show, hide}: any) {
    show({
        message: "",
        type: type === "critical" ? {critical: true} : {success: true},
    });
    if (type === "critical") setTimeout(() => hide(), 5000);


}

export function createBooking(data: any, {show, hide, navigate}: any): void {
    let dataValues: any[] = [];
    Object.keys(data).forEach((key) => {
        dataValues.push({dataElement: key, value: data[key]});
    });

    const body = generatePayload(dataValues);

    new BookingService()
        .createBooking(body)
        .then((res) => {
            navigate(`/profile/${res}`);
        })
        .catch((error) => {
            showMessage("error", "critical", {show, hide});
        });
}

export function updateBooking(data: any, eventId: string, {show, hide, navigate}: any): void {
    let dataValues: any[] = [];
    Object.keys(data).forEach((key) => {
        dataValues.push({dataElement: key, value: data[key]});
    });

    const body = generatePayload(dataValues, eventId);

    new BookingService()
        .updateBooking(body, eventId)
        .then((res) => navigate(`/profile/${eventId}`))
        .catch((error) => showMessage("error", "critical", {show, hide}));
}
