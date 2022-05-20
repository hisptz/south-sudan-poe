import {Button, InputField} from "@dhis2/ui";
import {useRecoilCallback} from "recoil";
import {
    bookingPaginationSelector,
    currentSearchedPassportNumberState,
} from "../../../../core/states/Booking_state";
import styles from "./Search.module.css";
import {useState} from "react";
import i18n from "@dhis2/d2-i18n";

function Search() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [error, setError] = useState<boolean | undefined>();


    const search = useRecoilCallback(
        ({set, reset}) =>
            (searchValue: string) => {
                set(currentSearchedPassportNumberState, searchValue);
                reset(bookingPaginationSelector);
            }
    );

    return (
        <div className={styles.container}>
            <InputField
                validationText={error ? i18n.t("Please enter a valid passport number") : undefined}
                error={error}
                value={searchValue}
                onChange={({value}: any) => {
                    if (error) {
                        setError(false);
                    }
                    setSearchValue(value)
                }}
                placeholder={i18n.t("Passport Number")}
            />
            <div
                className="button-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Button
                    name="Primary button"
                    onClick={() => {
                        if (searchValue.length < 4) {
                            setError(true)
                        } else {
                            search(searchValue);
                        }
                    }}
                    primary
                    value="default"
                >
                    {i18n.t("Search")}
                </Button>
            </div>
        </div>
    );
}

export default Search;
