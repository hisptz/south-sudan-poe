import { Button, InputField } from "@dhis2/ui";
import { useRecoilCallback } from "recoil";
import {
    bookingPaginationSelector,
    currentSearchedPassportNumberState,
} from "../../../../core/states/Booking_state";
import styles from "./Search.module.css";
import { useState } from "react";

function Search() {
    const [searchValue, setSearchValue] = useState<string>("");

    const search = useRecoilCallback(({ set, reset }) => (searchValue: string) => {
        set(currentSearchedPassportNumberState, searchValue);
        reset(bookingPaginationSelector);
    });
    return (
        <div className={styles.container}>
            <InputField
                value={searchValue}
                onChange={({ value }: any) => setSearchValue(value)}
                placeholder={"Passport Number"}
            />{" "}
            <div
                className="button-container"
                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
                <Button
                    name="Primary button"
                    onClick={() => search(searchValue)}
                    primary
                    value="default"
                >
                    Search
                </Button>
            </div>
        </div>
    );
}

export default Search;
