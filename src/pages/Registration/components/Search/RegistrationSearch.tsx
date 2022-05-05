import { Card, Button, InputField, CircularLoader } from "@dhis2/ui";
import styles from "./RegistrationSearch.module.css";
import {
  useRecoilCallback,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "@dhis2/d2-i18n";
import Landing from "../../../MyApplication/components/Landing";
import Loader from "../../../../shared/components/Loader";
import WarnBox from "../../../MyApplication/components/WarnBox";
import {
  currentSearchedPassportNumberState,
  bookingPaginationSelector,
  expiredBooking,
} from "../../../../core/states/Booking_state";
import style from "./Search.module.css";
import { useState } from "react";

const RegistrationSearch = () => {
  const searchKeyword = useRecoilValue(currentSearchedPassportNumberState);
  const { state, contents } = useRecoilValueLoadable<unknown | any>(
    expiredBooking
  );
  const navigate = useNavigate();
  const resetStates = useRecoilCallback(({ reset }) => () => {
    reset(currentSearchedPassportNumberState);
  });

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, []);

  const NavigationComponentFragment = () => {
    !contents?.expired
      ? navigate("/profile/" + contents?.eventId)
      : navigate("/registration/" + contents?.eventId);
    return <></>;
  };

  return (
    <div className={styles.container}>
      <div className="content-body">
        <h2>{i18n.t(`My Application `)}</h2>
        <Card style={{ padding: "10px" }}>
          <div className={styles["search-container"]}>
            <div className={styles.search}>
              <Search />
            </div>
          </div>
          <div className={styles["inner-container"]}>
            {!searchKeyword && <Landing />}
            {searchKeyword && (
              <div className={styles.table}>
                <Suspense fallback={<Loader small />}>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {state == "hasValue" && (
                      <WarnBox>
                        <p className={styles["box-content"]}>
                          {<NavigationComponentFragment />}
                        </p>
                      </WarnBox>
                    )}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "30%",
                      }}
                    >
                      <CircularLoader small />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  const search = useRecoilCallback(
    ({ set, reset }) =>
      (searchValue: string) => {
        set(currentSearchedPassportNumberState, searchValue);
        reset(bookingPaginationSelector);
      }
  );

  return (
    <div className={style.container}>
      <InputField
        value={searchValue}
        onChange={({ value }: any) => setSearchValue(value)}
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
          onClick={() => search(searchValue)}
          primary
          value="default"
        >
          {i18n.t("Search")}
        </Button>
      </div>
    </div>
  );
}

export default RegistrationSearch;
