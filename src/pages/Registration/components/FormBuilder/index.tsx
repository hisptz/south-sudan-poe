import styles from "./FormBuilder.module.css";
import { CustomInput } from "@hisptz/react-ui";
import { Controller } from "react-hook-form";

const FormBuilder = ({
  title,
  controls,
}: {
  title: string;
  controls:
    | {
        id: string;
        displayFormName: string;
        valueType: string;
        value: any;
        optionSet?: Array<any>;
        mandatory?: boolean
      }[]
    | any[];
}) => {
  return (
    <>
      <div className={styles["flex-row"]}>
        <div className={styles["label-container"]}>
          <label>{title}</label>
        </div>
        <div className={styles["content-container"]}>
          {controls.map((control, key) => (
            <Controller
            key={`${control.id}-form-input`}
            rules={{
              required: control.mandatory ? `${control.displayFormName} is required` : false
            }}
              name={control.id}
              render={({ field, fieldState }) => (
                <div key={key} style={{ width: "100%" }}>
                  <CustomInput        
                    optionSet={control.optionSet}
                    input={{
                      value: field.value,
                      onChange: field.onChange,
                    }}
                    validations={{
                      required: control.mandatory ? `${control.displayFormName} is required` : false
                    }}
                    error={Boolean(fieldState.error)}
                    validationText={fieldState.error?.message}
                    required={control.mandatory}
                    valueType={control.valueType}
                    label={control.displayFormName}
                  />
                </div>
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FormBuilder;
