import React from "react";
import styles from "./Registration.module.css"
import Back from "../../shared/components/Back";
import Form from "./components/Form";
import {Card} from '@dhis2/ui'

const Registration = () => {

    return (
        <div className={styles.container}>
            <div style={{paddingTop: 16, paddingLeft: 16}}>
                <Back/>
            </div>
            <React.Suspense fallback={<div>Loading</div>}>
                <div className="content-body">
                    <h2>Registration</h2>
                    <Card style={{padding: "10px"}}>
                        <Form/>
                    </Card>
                </div>
            </React.Suspense>
        </div>
    );
};

export default Registration;
