import Search from "./components/Search";
import Table from "./components/Table";
import {Card} from "@dhis2/ui";
import styles from "./MyApplication.module.css";
import {useRecoilCallback, useRecoilValue} from "recoil";
import {currentSearchedPassportNumberState} from "../../core/states/Booking_state";
import {Suspense, useEffect} from "react";
import Loader from "../../shared/components/Loader";
import Landing from "./components/Landing";

const MyApplication = () => {
    const searchKeyword = useRecoilValue(currentSearchedPassportNumberState)
    const resetStates = useRecoilCallback(({reset}) => () => {
        reset(currentSearchedPassportNumberState);
    })

    useEffect(() => {
        return () => {
            resetStates()
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className="content-body">
                <h2>My Applications</h2>
                <Card style={{padding: "10px"}}>
                    <div className={styles["search-container"]}>
                        <div className={styles.search}>
                            <Search/>
                        </div>
                    </div>
                    <div className={styles["inner-container"]}>
                        {
                            !searchKeyword && <Landing/>
                        }
                        {
                            searchKeyword && <div className={styles.table}>
                                <Suspense fallback={<Loader small/>}>
                                    <Table/>
                                </Suspense>
                            </div>
                        }
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyApplication;
