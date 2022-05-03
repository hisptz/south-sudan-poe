import Search from "./components/Search";
import Table from "./components/Table";
import { Card } from "@dhis2/ui";
import styles from "./MyApplication.module.css";
import {
  useRecoilCallback,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import {
  currentSearchedPassportNumberState,
  expiredBooking,
} from "../../core/states/Booking_state";
import { Suspense, useEffect } from "react";
import Loader from "../../shared/components/Loader";
import Landing from "./components/Landing";
import WarnBox from "./components/WarnBox";
import { Link } from "react-router-dom";
import i18n from "@dhis2/d2-i18n";

const MyApplication = () => {
  const searchKeyword = useRecoilValue(currentSearchedPassportNumberState);
  const { state, contents } = useRecoilValueLoadable(expiredBooking);
  const resetStates = useRecoilCallback(({ reset }) => () => {
    reset(currentSearchedPassportNumberState);
  });

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className="content-body">
        <h2>{i18n.t("My Applications")}</h2>
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
                    {state == "hasValue" && contents?.expired && (
                      <WarnBox>
                        <p className={styles["box-content"]}>
                          {i18n.t(
                            "All applications with passport number {{searchKeyword}} has expired",
                            {
                              searchKeyword,
                            }
                          )}
                          <br />
                          <Link
                            to={`/registration/${contents.eventId}`}
                            state={{ expired: true }}
                          >
                            {i18n.t("Click here", {
                              context: "Continues 'to register new'",
                            })}
                          </Link>{" "}
                          {i18n.t("to register new", {
                            context: "Starts with 'Click here'",
                          })}
                        </p>
                      </WarnBox>
                    )}
                    <Table />
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

export default MyApplication;
