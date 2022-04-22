import {Button} from "@dhis2/ui";
import styles from "./Form.module.css";
import FormBuilder from "../FormBuilder";
import {FormProvider} from "react-hook-form";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import useFormControl from "./hooks/form";
import Loader from "../../../../shared/components/Loader";
import Error from "../../../../shared/components/Error";

const Form = () => {
    const {loading, error, sections, dataElements, onSubmit, form, saving} = useFormControl();
    
    if (loading) {
        return (
            <div style={{minHeight: 500, justifyContent: "center", alignItems: "center", display: "flex"}}>
                <Loader small/>
            </div>
        );
    }

    if (error) return <Error error={error}/>;

    if (!sections) return <div>No form metadata</div>;

    return (
        <FormProvider {...form}>
            <div className={styles.container}>
                {sections &&
                    sections?.map(
                        (x: any, key: any) => (
                            <FormBuilder
                                key={"form-builder" + key}
                                title={x.displayFormName}
                                controls={x.dataElements}
                                stageDataElements={
                                    dataElements
                                }
                            />
                        )
                    )}

                <div className={styles["form-group"]}>
                    <Link to="/">
                        <Button name="Primary button" value="default">
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        primary
                        loading={saving}
                        onClick={form.handleSubmit(onSubmit)}
                        name="Primary button"
                        value="default"
                    >
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </FormProvider>
    );

};

export default Form;
