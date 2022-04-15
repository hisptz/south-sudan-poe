import Search from "./components/Search";
import Table from "./components/Table";
import {Card} from "@dhis2/ui";
import styles from "./MyApplication.module.css";

const MyApplication = () => {

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
