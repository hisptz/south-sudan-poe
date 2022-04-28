import {Button} from "@dhis2/ui";
import styles from "./Form.module.css";
import FormBuilder from "../FormBuilder";
import {FormProvider} from "react-hook-form";
import React from "react";
import {Link} from "react-router-dom";
import useFormControl from "./hooks/form";
import Loader from "../../../../shared/components/Loader";
import Error from "../../../../shared/components/Error";
import i18n from '@dhis2/d2-i18n';


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
            <form className={styles.container} onSubmit={form.handleSubmit(onSubmit)}>
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
                            {i18n.t("Cancel")}
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        primary
                        loading={saving}
                        name="Primary button"
                        value="default"
                    >
                        {saving ? i18n.t("Saving...") : i18n.t("Save")}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );

};

export default Form;
