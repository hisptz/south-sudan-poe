import Search from "./components/Search";
import Table from "./components/Table";
import {Card} from "@dhis2/ui";
import styles from "./MyApplication.module.css";
import {useRecoilCallback} from "recoil";
import {currentSearchedPassportNumberState} from "../../core/states/Booking_state";
import {useEffect} from "react";

const MyApplication = () => {

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
                    <div className={styles["inner-container"]}>
                        <div className={styles.search}>
                            <Search/>
                        </div>
                    </div>
                    <div className={styles["inner-container"]}>
                        <div className={styles.table}>
                            <Table/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyApplication;
