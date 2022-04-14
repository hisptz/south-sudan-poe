import { Input, FieldGroup, Checkbox, TextArea, Button } from "@dhis2/ui";
import styles from "./Form.module.css";
import { Data } from "./data";
import FormBuilder from "../FormBuilder";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback } from "react";
import { DECLARATIONS } from "./constant";

function Form() {
  const form = useForm({});

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <FormProvider {...form}>
      <div className={styles.container}>
        {Data.programStages[0].programStageSections.map((x, key) => (
          <FormBuilder
            key={"form-bulder" + key}
            title={x.displayFormName}
            controls={x.dataElements}
          />
        ))}

        <div className={styles["form-group"]}>
          <Button name="Primary button" value="default">
            Cancel
          </Button>
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
