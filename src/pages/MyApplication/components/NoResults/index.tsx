import {Button} from '@dhis2/ui'
import {useRecoilValue} from "recoil";
import {currentSearchedPassportNumberState} from "../../../../core/states/Booking_state";
import {useNavigate} from "react-router-dom";

export default function NoResults() {
    let currentSearchedPassportNumber = useRecoilValue<string>(currentSearchedPassportNumberState);
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minHeight: 500,
            padding: 16
        }}>
            <h1>No Results</h1>
            <p>Sorry, we couldn't find any bookings for your passport number <b>{currentSearchedPassportNumber}</b>.</p>
            <Button
                onClick={() => navigate('/registration', {state: {passportId: currentSearchedPassportNumber}})}>Create
                Booking</Button>
        </div>
    )
}
