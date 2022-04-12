import styles from './Registration.module.css'
import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import Form from './components/Form';
import { Link } from 'react-router-dom';
function Registration() {

    return (
        <div className={styles.container}>
            <div>
                <Link to="/">
                    <Button icon={<IconArrowLeft24 />} name="Primary button" value="default">Back</Button>
                </Link>
            </div>
            <div style={{ padding: "0 20%" }}>
                <h2>Registration</h2>
                <Card style={{ padding: "10px" }}>
                    <Form />
                </Card>
            </div>
        </div>);
}

export default Registration;