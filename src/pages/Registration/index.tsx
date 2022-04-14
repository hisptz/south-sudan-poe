import styles from "./Registration.module.css";
import {Card} from "@dhis2/ui";
import Form from "./components/Form";
import Back from "../../shared/components/Back";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import Error from "../Error";

const Registration = () => {

    return (
        <ErrorBoundary fallback={<Error/>}>
            <div className={styles.container}>
                <Back/>
                <React.Suspense fallback={<div>Loading</div>}>
                    <div className="content-body">
                        <h2>Registration</h2>
                        <Card style={{padding: "10px"}}>
                            <Form/>
                        </Card>
                    </div>
                </React.Suspense>
            </div>
        </ErrorBoundary>
    );
};

export default Registration;
