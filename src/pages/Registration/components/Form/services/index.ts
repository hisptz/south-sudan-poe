import {BookingEvent, DataValue} from "../../../../../core/interface/events";
import {METADATA} from "../../../../../core/constants";
import BookingService from "../../../../../core/services/BookingService";

function generatePayload(dataValues: DataValue[], orgUnit: string, event?: string): BookingEvent {
    return {
        program: METADATA.PROGRAM,
        programStage: METADATA.PROGRAM_STAGE,
        orgUnit,
        status: "ACTIVE",
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

export function createBooking({orgUnit, dataValues}: any, {show, hide, navigate}: any): void {

    const body = generatePayload(dataValues, orgUnit);

    new BookingService()
        .createBooking(body)
        .then((res) => {
            navigate(`/profile/${res}`);
        })
        .catch((error) => {
            showMessage("error", "critical", {show, hide});
        });
}

export function updateBooking({orgUnit, dataValues}: any, eventId: string, {show, hide, navigate}: any): void {

    const body = generatePayload(dataValues, orgUnit, eventId);

    new BookingService()
        .updateBooking(body, eventId)
        .then((res) => navigate(`/profile/${eventId}`))
        .catch((error) => showMessage("error", "critical", {show, hide}));
}
