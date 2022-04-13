
import Search from './components/Search';
import Table from './components/Table';
import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import styles from './MyApplication.module.css';
import { Link } from 'react-router-dom';
import Navigate from '../../shared/components/Navigate';


function MyApplication() {

    return (
        <div className={styles.container}>
            <Navigate path='/' label='Back' />
            <div style={{ padding: "0 15%" }}>
                <h2>My Applications</h2>
                <Card style={{ padding: "10px" }}>
                    <div className={styles["inner-container"]}>
                        <div className={styles.search}>
                            <Search />
                        </div>
                    </div>
                    <div className={styles["inner-container"]}>
                        <div className={styles.table}>
                            <Table />
                        </div>
                    </div>
                </Card>
            </div>
        </div>);
}

export default MyApplication;