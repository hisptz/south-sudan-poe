import { Button, CircularLoader } from "@dhis2/ui";
import styles from "./Form.module.css";
import FormBuilder from "../FormBuilder";
import { FormProvider, useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { DECLARATIONS } from "./constant";
import { usePullBookingMetadata } from "../../../../core/hooks/booking.hooks";
import { Link } from "react-router-dom";

function Form() {
  const { error, loading, data: formMetaData } = usePullBookingMetadata();

  const form = useForm({});

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  if (loading)
    return (
      <div
        style={{
          height: "500px",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "auto" }}>
          <CircularLoader />
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <FormProvider {...form}>
      <div className={styles.container}>
        {formMetaData.programStages &&
          formMetaData.programStages[0].programStageSections?.map(
            (x: any, key: any) => (
              <FormBuilder
                key={"form-bulder" + key}
                title={x.displayFormName}
                controls={x.dataElements}
                stageDataElements={
                  formMetaData.programStages[0]?.programStageDataElements
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
            onClick={form.handleSubmit(onSubmit)}
            name="Primary button"
            value="default"
          >
            Save
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}

export default Form;
