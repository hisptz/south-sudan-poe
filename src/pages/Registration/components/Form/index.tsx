import {Button} from "@dhis2/ui";
import styles from "./Form.module.css";
import {FormProvider} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import useFormControl from "./hooks/form";
import Loader from "../../../../shared/components/Loader";
import Error from "../../../../shared/components/Error";
import i18n from "@dhis2/d2-i18n";
import {DevTool} from "@hookform/devtools";
import {CustomAccordion} from "./CustomAccordion";
import {FormSection} from "../../interfaces/form";
import {useEffect, useReducer, useState} from "react";
import {compact, head, isEmpty} from "lodash";


const reducer = (expandedAccordions: any[], sectionId: string) => {
    if (expandedAccordions.includes(sectionId)) {
        return [];
    } else {
        return [sectionId];
    }
}

const Form = () => {
    const {loading, error, sections, dataElements, onSubmit, form, saving} =
        useFormControl();

    const navigate = useNavigate();

    const [expandedAccordions, setExpandedAccordions] = useReducer(reducer, compact([head(sections)?.id]));

    useEffect(() => {
        if (!loading && !isEmpty(sections) && isEmpty(expandedAccordions)) {
            setExpandedAccordions(head(sections)?.id ?? "");
        }
    }, [loading, sections]);


    if (loading) {
        return (
            <div
                style={{
                    minHeight: 500,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <Loader small/>
            </div>
        );
    }

    if (error) return <Error error={error}/>;

    if (!sections) return <Error error={{
        message: i18n.t("Could not load data from server. Please try again later.")
    }}/>;

    return (
        <FormProvider {...form}>
            <form className={styles.container} onSubmit={form.handleSubmit(onSubmit)}>
                {sections &&
                    sections?.map((section: FormSection, key: number) => {
                        let previousSectionDataElementIds: any[] =
                            key === 0
                                ? sections[key]["dataElements"]
                                : sections[key - 1]["dataElements"];
                        return (
                            <CustomAccordion
                                expandedAccordions={expandedAccordions}
                                onExpand={setExpandedAccordions}
                                keyValue={key}
                                section={section}
                                dataElements={dataElements}
                                previousSectionDataElementIds={previousSectionDataElementIds}
                            />
                        );
                    })}

                <div className={styles["form-group"]}>
                    <Button onClick={() => {
                        navigate("/");
                    }} name="Primary button" value="default">
                        {i18n.t("Cancel")}
                    </Button>
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
            <DevTool control={form?.control}/>
        </FormProvider>
    );
};

export default Form;
