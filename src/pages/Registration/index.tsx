import styles from './Registration.module.css'
import { Card, Button, IconArrowLeft24 } from '@dhis2/ui'
import Form from './components/Form';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BookingConfigurationState } from '../../core/states/Booking_Configuration_state/booking_configuration';
function Registration() {
    let valuedOject = useRecoilValue(BookingConfigurationState)
useEffect(()=>{
console.log(valuedOject)
},[])
    return (
        <div className={styles.container}>
            <div>
                <Link to="/">
                    <Button icon={<IconArrowLeft24 />} name="Primary button" value="default">Back</Button>
                </Link>
            </div>
            <div style={{ padding: "0 15%" }}>
                <h2>Registration</h2>
                <Card style={{ padding: "10px" }}>
                    <Form />
                </Card>
            </div>
        </div>);
}

export default Registration;