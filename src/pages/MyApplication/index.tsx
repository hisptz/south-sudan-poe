
import Search from './components/Search';
import Table from './components/Table';
import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import styles from './MyApplication.module.css';
import { useNavigate } from 'react-router-dom';


function MyApplication() {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Button icon={<IconArrowLeft24 />} name="Primary button" value="default" onClick={() => navigate(-1)} >Back</Button>
            <div className='content-body'>
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