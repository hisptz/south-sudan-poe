import { Button } from "@dhis2/ui";
import { useRecoilValue } from "recoil";
import { currentSearchedPassportNumberState } from "../../../../core/states/Booking_state";
import { useNavigate } from "react-router-dom";
import i18n from "@dhis2/d2-i18n";

export default function NoResults() {
  let currentSearchedPassportNumber = useRecoilValue<string>(
    currentSearchedPassportNumberState
  );
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 500,
        padding: 16,
        textAlign: "center",
      }}
    >
      <h1>{i18n.t("No Results")}</h1>
      <p>
        {i18n.t(
          "Sorry, we couldn't find any bookings for your passport number",
          {
            context: "The passport is shown next to these words in bold",
          }
        )}{" "}
        <b>{currentSearchedPassportNumber}</b>.
      </p>
      <Button
        onClick={() =>
          navigate("/registration", {
            state: { passportId: currentSearchedPassportNumber },
          })
        }
      >
        {i18n.t("Create Booking", {
          context: "Navigates to the registration page",
        })}
      </Button>
    </div>
  );
}
