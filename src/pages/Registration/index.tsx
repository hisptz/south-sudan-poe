import styles from './Registration.module.css'
import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import Form from './components/Form';
import { Link, useNavigate } from 'react-router-dom';


function Registration() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Button icon={<IconArrowLeft24 />} name="Primary button" value="default" onClick={() => navigate(-1)} >Back</Button>
            <div className='content-body'>
                <h2>Registration</h2>
                <Card style={{ padding: "10px" }}>
                    <Form />
                </Card>
            </div>
        </div>);
}

export default Registration;