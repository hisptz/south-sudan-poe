import Search from "./components/Search";
import Table from "./components/Table";
import { Card } from "@dhis2/ui";
import styles from "./MyApplication.module.css";
import {
    useRecoilCallback,
    useRecoilValue,
    useRecoilValueLoadable,
    useSetRecoilState,
} from "recoil";
import {
    currentSearchedPassportNumberState,
    expiredBooking,
} from "../../core/states/Booking_state";
import { Suspense, useEffect } from "react";
import Loader from "../../shared/components/Loader";
import Landing from "./components/Landing";
import WarnBox from "./components/WarnBox";
import { Link} from "react-router-dom";

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
                <h2>My Applications</h2>
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
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "16px",
                                        }}
                                    >
                                        {state == "hasValue" && contents?.expired && (
                                            <WarnBox>
                                                <p className={styles["box-content"]}>
                                                    All applications with passport number
                                                    <span>{searchKeyword}</span> has expired.{" "}
                                                    <br />
                                                    <Link to={`/registration/${contents.eventId}`} state={{expired:true}}>Click here</Link> to
                                                    register new.
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
