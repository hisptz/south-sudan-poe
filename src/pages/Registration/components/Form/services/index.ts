import { BookingEvent, DataValue } from "../../../../../core/interface/events";
import { METADATA } from "../../../../../core/constants";
import BookingService from "../../../../../core/services/BookingService";
import { uid } from "../../../../../shared/utils";
import i18n from "@dhis2/d2-i18n";

function generatePayload(
  dataValues: DataValue[],
  orgUnit: string,
  event?: string
): BookingEvent {
  return {
    program: METADATA.PROGRAM,
    programStage: METADATA.PROGRAM_STAGE,
    orgUnit,
    status: "ACTIVE",
    attributeCategoryOptions: METADATA.ATTRIBUTE_CATEGORY_OPTION,
    attributeOptionCombo: METADATA.ATTRIBUTE_OPTION_COMBO,
    eventDate: new Date().toISOString(),
    event: event ?? uid(),
    dataValues,
  };
}

function showMessage(message: string, type: string, { show, hide }: any) {
  show({
    message,
    type: type === "critical" ? { critical: true } : { success: true },
  });
  if (type === "critical") setTimeout(() => hide(), 5000);
}

export function createBooking(
  { orgUnit, dataValues }: any,
  { show, hide, navigate, setSaving }: any
): void {
  const body = generatePayload(dataValues, orgUnit);

  new BookingService()
    .createBooking(body)
    .then((res) => {
      showMessage(i18n.t("Booking successfully saved"), "success", {
        show,
        hide,
      });
      navigate(`/profile/${body.event}`);
    })
    .catch((error) => {
      showMessage(
        i18n.t("Error saving booking, {{errorMessage}}", {
          errorMessage: error.message,
        }),
        "critical",
        {
          show,
          hide,
        }
      );
    })
    .finally(() => setSaving(false));
}

export function updateBooking(
  { orgUnit, dataValues }: any,
  eventId: string,
  { show, hide, navigate, setSaving, resetProfileData }: any
): void {
  const body = generatePayload(dataValues, orgUnit, eventId);

  new BookingService()
    .updateBooking(body, eventId)
    .then((res) => {
      showMessage(i18n.t("Booking successfully updated"), "success", {
        show,
        hide,
      });
      resetProfileData(eventId);
      navigate(`/profile/${eventId}`);
    })
    .catch((error) => {
      showMessage(
        i18n.t("Error updating booking, {{ error }}", {
          error: error.message,
        }),
        "critical",
        {
          show,
          hide,
        }
      );
    })
    .finally(() => setSaving(false));
}
