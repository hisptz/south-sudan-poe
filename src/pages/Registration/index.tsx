import styles from './Registration.module.css'
import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import Form from './components/Form';
import { Link } from 'react-router-dom';
import Navigate from '../../shared/components/Navigate';
function Registration() {

    return (
        <div className={styles.container}>
            <Navigate path='/' label='Back' />
            <div style={{ padding: "0 15%" }}>
                <h2>Registration</h2>
                <Card style={{ padding: "10px" }}>
                    <Form />
                </Card>
            </div>
        </div>);
}

export default Registration;