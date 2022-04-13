import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import styles from './Profile.module.css';
import { Link } from 'react-router-dom';
import Navigate from '../../shared/components/Navigate';

function Profile() {
    return (
        <div className={styles.container}>
             <Navigate path='/' label='Back' />
            <div style={{ padding: "0 15%" }}>
                <h2>Traveller profile</h2>
                <Card style={{ padding: "10px" }}>

                </Card>
            </div>
        </div>)
}

export default Profile;