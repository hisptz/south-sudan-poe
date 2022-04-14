import styles from "./FormBuilder.module.css";
import {CustomInput} from "@hisptz/react-ui";
import {Controller} from "react-hook-form";

const FormBuilder = ({
                         title,
                         controls,
                         stageDataElements,
                     }: {
    title: string;
    controls:
        | {
        id: string;
        displayFormName: string;
        valueType: string;
        value: any;
        optionSet?: Array<any>;
    }[]
        | any[];
    stageDataElements: {
        id: string;
        compulsory: boolean;
        dataElement: { id: string };
    }[];
}) => {
    return (
        <>
            <div className={styles["flex-row"]}>
                <div className={styles["label-container"]}>
                    <label>{title}</label>
                </div>
                <div className={styles["content-container"]}>
                    {controls.map((control, key) => {
                        const mandatory = control.compulsory ?? stageDataElements.filter(
                            (x) => x.dataElement.id === control.id
                        )[0]?.compulsory;
                        return (
                            <Controller
                                key={`${control.id}-form-input`}
                                rules={{
                                    required: mandatory
                                        ? `${control.displayFormName} is required`
                                        : false,
                                }}
                                name={control.id}
                                render={({field, fieldState}) => (
                                    <div key={key} style={{width: "100%"}}>
                                        <CustomInput
                                            filterable
                                            optionSet={control.optionSet}
                                            input={{
                                                name: "",
                                                value: field.value,
                                                onChange: field.onChange,
                                            }}
                                            validations={{
                                                required: mandatory
                                                    ? `${control.displayFormName} is required`
                                                    : false,
                                            }}
                                            { /*@ts-ignore */ ...""}
                                            error={Boolean(fieldState.error)}
                                            validationText={fieldState.error?.message}
                                            required={mandatory}
                                            valueType={control.valueType}
                                            label={control.displayFormName}
                                        />
                                    </div>
                                )}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FormBuilder;
